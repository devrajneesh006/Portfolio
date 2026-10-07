// Generates public/resume.pdf from src/data/*.js — the single source of truth.
// Run: npm run resume
// Only committed facts are rendered. Anything still marked TODO_ in the data
// files is left out of the PDF rather than printed.
import { writeFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outPath = join(root, 'public', 'resume.pdf')

const { resume } = await import(pathToFileURL(join(root, 'src', 'data', 'resume.js')).href)
const { socials, isPlaceholder } = await import(pathToFileURL(join(root, 'src', 'data', 'socials.js')).href)

const isReal = (value) => typeof value === 'string' && value.trim() && !isPlaceholder(value)

const lines = []
const push = (text, size = 10, style = 'regular', gapAfter = 4) => lines.push({ text, size, style, gapAfter })

push(resume.name, 20, 'bold', 2)
push(resume.role, 12, 'regular', 2)
const contact = [
  resume.location.display,
  isReal(socials.email) ? socials.email : null,
  isReal(socials.github) ? socials.github.replace(/^https?:\/\//, '') : null,
].filter(Boolean).join('  ·  ')
push(contact, 9, 'regular', 10)

push('SUMMARY', 11, 'bold', 3)
push(resume.summary, 10, 'regular', 10)

push('SKILLS', 11, 'bold', 3)
for (const [label, skills] of Object.entries(resume.skills)) {
  push(`${label}: ${skills.join(', ')}`, 10, 'regular', 4)
}
lines.push({ text: '', size: 10, style: 'regular', gapAfter: 6 })

push('EXPERIENCE', 11, 'bold', 3)
for (const job of resume.experience) {
  const period = isReal(job.period) ? ` (${job.period})` : ''
  push(`${job.role} — ${job.company}${period}`, 10, 'bold', 2)
  const realBullets = (job.bullets || []).filter((bullet) => isReal(bullet))
  for (const bullet of realBullets) push(`•  ${bullet}`, 10, 'regular', 2)
  lines.push({ text: '', size: 10, style: 'regular', gapAfter: 4 })
}

push('EDUCATION', 11, 'bold', 3)
for (const item of resume.education) {
  const detail = item.detail ? ` — ${item.detail}` : ''
  push(`${item.title}, ${item.institution}${detail}`, 10, 'regular', 4)
}
lines.push({ text: '', size: 10, style: 'regular', gapAfter: 6 })

if (resume.certificates?.length) {
  push('CERTIFICATES', 11, 'bold', 3)
  for (const item of resume.certificates) {
    const year = item.year ? ` (${item.year})` : ''
    push(`${item.title} — ${item.institution}${year}`, 10, 'regular', 4)
  }
}

// ---- Minimal PDF 1.4 writer (Helvetica / WinAnsi, no dependencies) ----
const escapeText = (text) =>
  text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')

const wrap = (text, maxChars) => {
  if (!text) return ['']
  const words = text.split(/\s+/)
  const rows = []
  let row = ''
  for (const word of words) {
    const candidate = row ? `${row} ${word}` : word
    if (candidate.length > maxChars && row) {
      rows.push(row)
      row = word
    } else {
      row = candidate
    }
  }
  if (row) rows.push(row)
  return rows
}

const PAGE_WIDTH = 595
const PAGE_HEIGHT = 842
const MARGIN = 56
const MAX_CHARS = 92

const pages = []
let current = []
let y = PAGE_HEIGHT - MARGIN
const flush = () => {
  if (current.length) pages.push(current)
  current = []
  y = PAGE_HEIGHT - MARGIN
}

for (const line of lines) {
  for (const row of wrap(line.text, MAX_CHARS)) {
    if (y < MARGIN + 20) flush()
    current.push({ row, size: line.size, style: line.style, y })
    y -= line.size + 3
  }
  y -= line.gapAfter
}
flush()

const objects = []
// 1: catalog, 2: pages, 3: font, then content + page pairs
const contentIds = pages.map((_, index) => 4 + index * 2)
const pageIds = pages.map((_, index) => 5 + index * 2)
const kids = pageIds.map((id) => `${id} 0 R`).join(' ')
objects[1] = '<< /Type /Catalog /Pages 2 0 R >>'
objects[2] = `<< /Type /Pages /Kids [${kids}] /Count ${pageIds.length} >>`
objects[3] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'

pages.forEach((rows, index) => {
  const ops = rows
    .map(({ row, size, style, y: lineY }) => {
      const fontRef = style === 'bold' ? '/F2' : '/F1'
      return `BT ${fontRef} ${size} Tf ${MARGIN} ${lineY.toFixed(1)} Td (${escapeText(row)}) Tj ET`
    })
    .join('\n')
  objects[contentIds[index]] = `<< /Length ${Buffer.byteLength(ops, 'latin1')} >>\nstream\n${ops}\nendstream`
  objects[pageIds[index]] =
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] ` +
    `/Resources << /Font << /F1 3 0 R >> >> /Contents ${contentIds[index]} 0 R >>`
})

const boldId = objects.length
objects[boldId] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>'
pages.forEach((_, index) => {
  objects[pageIds[index]] = objects[pageIds[index]].replace(
    '/Font << /F1 3 0 R >>',
    `/Font << /F1 3 0 R /F2 ${boldId} 0 R >>`,
  )
})

let pdf = '%PDF-1.4\n'
const offsets = [0]
for (let id = 1; id < objects.length; id += 1) {
  offsets[id] = Buffer.byteLength(pdf, 'latin1')
  pdf += `${id} 0 obj\n${objects[id]}\nendobj\n`
}
const xrefAt = Buffer.byteLength(pdf, 'latin1')
pdf += `xref\n0 ${objects.length}\n0000000000 65535 f \n`
for (let id = 1; id < objects.length; id += 1) {
  pdf += `${String(offsets[id]).padStart(10, '0')} 00000 n \n`
}
pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefAt}\n%%EOF`

writeFileSync(outPath, pdf, 'latin1')
console.log(`Wrote ${outPath} (${pages.length} page${pages.length === 1 ? '' : 's'})`)
