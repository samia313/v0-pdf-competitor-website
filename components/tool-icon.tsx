'use client'

import {
  FileText,
  Scissors,
  RotateCw,
  Trash2,
  ArrowUpDown,
  Minimize2,
  FileType,
  Image,
  Code,
  Edit,
  Droplets,
  Hash,
  Lock,
  Unlock,
  PenTool,
  Merge,
  Folder,
  Zap,
  FileInput,
  FileOutput,
  Shield,
  ScanText,
  Sparkles,
  Languages,
} from 'lucide-react'

export const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  merge: Merge,
  split: Scissors,
  rotate: RotateCw,
  trash: Trash2,
  reorder: ArrowUpDown,
  compress: Minimize2,
  word: FileText,
  excel: FileType,
  ppt: FileType,
  image: Image,
  html: Code,
  edit: Edit,
  watermark: Droplets,
  numbers: Hash,
  lock: Lock,
  unlock: Unlock,
  signature: PenTool,
  folder: Folder,
  zap: Zap,
  'file-input': FileInput,
  'file-output': FileOutput,
  shield: Shield,
  scan: ScanText,
  sparkles: Sparkles,
  languages: Languages,
}

export function ToolIcon({ icon, className }: { icon: string; className?: string }) {
  const IconComponent = iconMap[icon] || FileText
  return <IconComponent className={className} />
}
