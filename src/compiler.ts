import { AnyType } from "./ts"

type CompiledType = {
  name: string
  outName: string
  code: string
}

export class TypeCompiler {
  private types: { [key: string]: { type: AnyType; namespace: string } } = {}
  private compiledTypes: Map<AnyType, CompiledType> = new Map()
  private namesUsed: Set<string> = new Set()
  private additionalFragments: Set<string> = new Set()

  addType(namespace: string, name: string, type: AnyType) {
    if (name[0] !== name[0].toUpperCase())
      throw new Error(
        `Invalid type name '${name}'. Type names must begin with a capital letter.`
      )
    if (!isValidIdentifier(name))
      throw new Error(
        `Invalid type name '${name}' was used. Type names must be valid TypeScript/JavaScript identifiers.`
      )
    if (this.types[name]) throw new Error(`Redefinition of type '${name}'`)
    this.types[name] = { type, namespace }
  }

  private getName(name: string): string {
    let suffix = 0
    while (true) {
      const candidate = name + (suffix ? suffix : "")
      if (!this.namesUsed.has(candidate)) {
        return candidate
      }
    }
  }

  serializeType(name: string, type: AnyType) {
    // Only compile once!
    const existing = this.compiledTypes.get(type)
    if (existing) {
      return existing.outName
    }

    // Reserve a type name
    const outName = this.getName(name)
    this.namesUsed.add(outName)

    // Optimisitically add the compiled type now, in case child types depend on this one
    const compiled = {
      name,
      outName,
      code: `type ${outName} = any`
    }
    this.compiledTypes.set(type, compiled)

    // Compile, and override the temporary value
    compiled.code = `type ${outName} = ${type.getTS(this)};`

    // Return the local TypeScript name
    return outName
  }

  addFragment(fragment: string) {
    if (!this.additionalFragments.has(fragment)) {
      this.additionalFragments.add(fragment)
    }
  }

  end() {
    this.additionalFragments = new Set()
    this.compiledTypes = new Map()
    this.namesUsed = new Set()
    const namespaces: { [namespace: string]: string[] } = {}
    const typeList = Object.entries(this.types)
    for (const [name, entry] of typeList) {
      this.serializeType(name, entry.type)
      if (!namespaces[entry.namespace]) namespaces[entry.namespace] = []
      namespaces[entry.namespace].push(name)
    }

    const fragments: string[] = [...this.additionalFragments]

    for (const type of this.compiledTypes.values()) {
      fragments.push(type.code)
    }

    return {
      fragments: fragments,
      namespaces: namespaces
    }
  }
}

function isValidIdentifier(name: string) {
  if (name.match(/[\s\.\,\>\[\]\(\)\{\}}]/)) return false
  try {
    eval(`var ${name} = true`)
  } catch (e) {
    return false
  }
  return true
}
