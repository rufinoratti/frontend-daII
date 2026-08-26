import type { Assignment } from '../../types/domain'

export function timeToMinutes(value: string) {
  const [hours, minutes] = value.split(':').map(Number)
  return hours * 60 + minutes
}

export function assignmentsOverlap(first: Pick<Assignment, 'day' | 'room' | 'start' | 'end' | 'period'>, second: Pick<Assignment, 'day' | 'room' | 'start' | 'end' | 'period'>) {
  if (first.day !== second.day || first.room !== second.room || first.period !== second.period) return false
  return timeToMinutes(first.start) < timeToMinutes(second.end) && timeToMinutes(second.start) < timeToMinutes(first.end)
}

export function findAssignmentConflicts(assignments: Assignment[]) {
  const conflicts: [Assignment, Assignment][] = []
  assignments.forEach((assignment, index) => assignments.slice(index + 1).forEach((other) => {
    if (assignmentsOverlap(assignment, other)) conflicts.push([assignment, other])
  }))
  return conflicts
}
