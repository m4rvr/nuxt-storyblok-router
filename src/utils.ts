import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'
import slugify from 'slugify'

export function pascalCase (value: string): string {
  return upperFirst(camelCase(value))
}

export function normalizeName (value: string): string {
  return slugify(value.replace(/\//g, ' '))
}
