import { StackedWorkReel } from '@/components/ui/StackedWorkReel'
import { projectsData, Project } from '@/lib/data/projects'

interface WorkSectionProps {
  projects?: Project[]
}

export function WorkSection({ projects }: WorkSectionProps) {
  return <StackedWorkReel projects={projects || projectsData.filter((p) => p.featured).slice(0, 4)} />
}
