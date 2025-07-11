// lib/skills.ts
import skillsData from '@/data/skills.json'

export interface SkillCategory {
  id: string
  title: string
  items: string[]
}

export const getSkillCategories = (): SkillCategory[] => {
  return skillsData.categories
}

export const getSkillsByCategory = (categoryId: string): string[] => {
  const category = skillsData.categories.find(cat => cat.id === categoryId)
  return category?.items || []
}