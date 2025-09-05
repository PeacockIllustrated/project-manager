
const PROJECT_COLORS = [
  '#43C4B2', // prestige-teal
  '#3B82F6', // blue-500
  '#8B5CF6', // violet-500
  '#EC4899', // pink-500
  '#F59E0B', // amber-500
  '#10B981', // emerald-500
  '#6366F1', // indigo-500
  '#D946EF', // fuchsia-500
];

/**
 * Generates a consistent color from a predefined palette based on a string ID.
 * @param id The string identifier (e.g., project.id)
 * @returns A hex color code as a string.
 */
export const generateProjectColor = (id: string): string => {
  if (!id) {
    return '#6C757D'; // prestige-text
  }

  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    const char = id.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  const index = Math.abs(hash) % PROJECT_COLORS.length;
  return PROJECT_COLORS[index];
};
