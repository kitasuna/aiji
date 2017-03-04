import * as fs from 'fs'

let dict = []
let filename = './dict/v0.txt'

// Loads the file into an object
const readDictFile = function(filename) {
  return new Promise(function(resolve, reject) {
    try {
      fs.readFile(filename, 'utf8', function(err, data) {
        if(err) {
          reject(err)
        }

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

        resolve(dict)

      })

    } catch (err) {
      reject(err)
    }
  })
}

const parseInFile = function(dict, filename = './data/t0.txt') {
  return new Promise(function(resolve, reject) {
    try {
      fs.readFile(filename, 'utf8', function(err, data) {
        if(err) {
          // TODO: for some reason a missing file doesn't throw an error...
          reject(err)
        }

        let lines = data.split('\n')
        // TODO: maintain capitalization if word is not in dictionary in lowercase form
        lines.forEach(function(line) {
          console.log('ORIG: "' + line + '"')
          let translated = ''
          let words = line.split(' ')
          words.forEach(function (word, index) {
            if(index != 0 && /^[A-Z]/.test(word)) {
              // Untranslated words should be followed by a space
              translated += word + ' '
            } else {
              let tw = dictLookup(dict, word.toLowerCase())
              translated += tw
            }
          })
          console.log('TRNS: "' + translated + '"')
        })
      })
    } catch(err) {
      reject(err)
    }
  })
}

readDictFile(filename)
  .then(function(parsedDict) {
    //console.dir(parsedDict)
    return parsedDict
  })
  .then(parseInFile)

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
