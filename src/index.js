import * as fs from 'fs'

let dict = []

// Loads the file into an object
fs.readFile('./dict/v0.txt', 'utf8', function(err, data) {
  let lines = data.split('\n') 
  lines.forEach(function(line) {
    line = stripTrailingComma(line)
    let entry = line.split('|')
    if(entry[1] !==  undefined) {
      entry[1].split(',').forEach(function(key) {
        dict[key] = entry[0]
      })
    }
  })

	Object.keys(dict).forEach(function(key) {
		dict[key] = parseDictEntry(dict, dict[key])
	})

})

// Recursively parse a single dict entry
function parseDictEntry(dict, entry) {
	let bracketsRe = new RegExp(/\{\{(.+?)\}\}/)
	let found = entry.match(bracketsRe)
	if(found === null) {
		return entry
	} else {
		entry = parseDictEntry(dict, entry.replace(bracketsRe, dictLookup(dict, found[1])))
    return entry
	}
}

// Look up an item in a given dictionary
function dictLookup(dict, sourceTerm) {
	if(dict.hasOwnProperty(sourceTerm)) {
		return dict[sourceTerm]
	}
	
	// return term untranslated if not present in dict	
	return sourceTerm
}

function stripTrailingComma(line) {
  /*
   * recurrence terminator just in case
   */
  if(line.length == 0) {
    return line
  }

  if(line.slice(-1) == ',' || line.slice(-1) == ' ') {
    return stripTrailingComma(line.substring(0, line.length - 1))
  } else {
    return line
  }
}

function addEntry(dict, keys, value) {
  return dict
}
