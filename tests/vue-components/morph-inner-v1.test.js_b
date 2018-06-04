/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { shallowMount, mount } from '@vue/test-utils'
import MorphInner from '@/vue-components/morph-inner-v1.vue'
import InflectionAttribute from '@/vue-components/infl-attribute.vue'
import ShortDef from '@/vue-components/shortdef.vue'

import { LanguageModelFactory as LMF } from 'alpheios-data-models'

console.error = function () {}
console.log = function () {}

describe('morph-inner-v1.test.js', () => {
  it('1 Morph - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(MorphInner, {
      propsData: {
        lexemes: []
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 Morph - render with children components (min requirements without InflectionAttribute)', () => {
    let cmp = mount(MorphInner, {
      propsData: {
        lex:
          {
            inflections: [],
            lemma: {
              ID: '1',
              features: {},
              languageCode: 'lat',
              languageID: LMF.getLanguageIdFromCode('lat'),
              word: 'foo-word',
              principalParts: [ 'part1', 'part2' ]
            },
            meaning: {},
            isPopulated: () => { return true },
            getGroupedInflections: () => { return [] }
          },
        index: 0,
        count: 1,
        morphDataReady: true
      },
      stubs: [ 'inflectionattribute' ]
    })
    expect(cmp.isVueInstance()).toBeTruthy()

    expect(cmp.find('.principal_parts').exists()).toBeTruthy()

    expect(cmp.findAll('.principal_parts').length).toEqual(1)
    expect(cmp.findAll('.principal_parts .lemma_index').exists()).toBeFalsy()
  })

  it('3 Morph - render principal parts (min requirements without InflectionAttribute)', () => {
    let cmp = mount(MorphInner, {
      propsData: {
        lex:
          {
            inflections: [],
            lemma: {
              ID: '1',
              features: {},
              languageCode: 'lat',
              languageID: LMF.getLanguageIdFromCode('lat'),
              word: 'foo-word',
              principalParts: [ 'part1', 'part2' ]
            },
            meaning: {},
            isPopulated: () => { return true },
            getGroupedInflections: () => { return [] }
          },
        index: 0,
        count: 1,
        morphDataReady: true
      },
      stubs: { 'inflectionattribute': '<div class="inflectionattribute"></div>' }
    })

    let hasLemmaWordInPrincipalParts = false
    let cntPParts = 0

    let spansPP = cmp.findAll('.principal_parts span')

    for (let i = 0; i < spansPP.length; i++) {
      if (spansPP.at(i).text() === 'foo-word') {
        hasLemmaWordInPrincipalParts = true
      }
      if (spansPP.at(i).text() === 'part1' || spansPP.at(i).text() === 'part2') {
        cntPParts++
      }
    }
    expect(hasLemmaWordInPrincipalParts).toBeTruthy()
    expect(cntPParts).toEqual(2)

    expect(cmp.findAll('.principal_parts .inflectionattribute').length).toEqual(1)
  })

  it('4 Morph - render principal parts (min requirements with InflectionAttribute)', () => {
    let cmp = mount(MorphInner, {
      propsData: {
        lex:
          {
            inflections: [],
            lemma: {
              ID: '1',
              features: {
                frequency: {
                  value: 'fooFrequency',
                  type: 'frequency',
                  languageID: LMF.getLanguageIdFromCode('lat')
                },
                age: {
                  value: 'fooAge',
                  type: 'age',
                  languageID: LMF.getLanguageIdFromCode('lat')
                },
                pronunciation: {
                  value: 'fooPronunciation',
                  type: 'pronunciation',
                  languageID: LMF.getLanguageIdFromCode('lat')
                }
              },
              languageCode: 'lat',
              languageID: LMF.getLanguageIdFromCode('lat'),
              word: 'foo-word',
              principalParts: [ 'part1', 'part2' ]
            },
            meaning: {},
            isPopulated: () => { return true },
            getGroupedInflections: () => { return [] }
          },
        index: 0,
        count: 1,
        morphDataReady: true
      }
    })

    let allInflectionAttributesPP = cmp.find('.principal_parts').findAll(InflectionAttribute)
    let checksPassed = 0
    expect(allInflectionAttributesPP.length).toEqual(2)

    for (let i = 0; i < allInflectionAttributesPP.length; i++) {
      if (allInflectionAttributesPP.at(i).vm.type === 'pronunciation') {
        checksPassed++
        expect(allInflectionAttributesPP.at(i).find('span').exists()).toBeTruthy()
        expect(allInflectionAttributesPP.at(i).find('span').text().indexOf('fooPronunciation')).toBeGreaterThan(-1)
      }

      if (allInflectionAttributesPP.at(i).vm.type === 'extras') {
        checksPassed++
        expect(allInflectionAttributesPP.at(i).find('span').exists()).toBeTruthy()
        expect(allInflectionAttributesPP.at(i).find('span').text().indexOf('fooFrequency')).toBeGreaterThan(-1)
        expect(allInflectionAttributesPP.at(i).find('span').text().indexOf('fooAge')).toBeGreaterThan(-1)
      }

      if (allInflectionAttributesPP.at(i).vm.decorators.length > 0 && allInflectionAttributesPP.at(i).vm.decorators.indexOf('brackets') > -1 && allInflectionAttributesPP.at(i).find('span').exists()) {
        expect(allInflectionAttributesPP.at(i).find('span').text().indexOf('[')).toBeGreaterThan(-1)
        expect(allInflectionAttributesPP.at(i).find('span').text().indexOf(']')).toBeGreaterThan(-1)
      }
    }
    expect(checksPassed).toEqual(2)
  })

  it('5 Morph - render alpheios-morph__morphdata and feature_source (min requirements with InflectionAttribute)', () => {
    let cmp = mount(MorphInner, {
      propsData: {
        lex:
          {
            inflections: [],
            lemma: {
              ID: '1',
              features: {
                case: {
                  value: 'fooGrmCase',
                  type: 'case',
                  languageID: LMF.getLanguageIdFromCode('lat')
                },
                gender: {
                  value: 'fooGender',
                  type: 'gender',
                  languageID: LMF.getLanguageIdFromCode('lat')
                },
                'part of speach': {
                  value: 'fooPart',
                  type: 'part of speach',
                  languageID: LMF.getLanguageIdFromCode('lat')
                },
                kind: {
                  value: 'fooKind',
                  type: 'kind',
                  languageID: LMF.getLanguageIdFromCode('lat')
                },
                declension: {
                  value: 'fooDeclension',
                  type: 'declension',
                  languageID: LMF.getLanguageIdFromCode('lat')
                },
                conjugation: {
                  value: 'fooConjugation',
                  type: 'conjugation',
                  languageID: LMF.getLanguageIdFromCode('lat')
                },
                note: {
                  value: 'fooNote',
                  type: 'note',
                  languageID: LMF.getLanguageIdFromCode('lat')
                },
                source: {
                  value: 'fooSource',
                  type: 'source',
                  languageID: LMF.getLanguageIdFromCode('lat')
                }
              },
              languageCode: 'lat',
              languageID: LMF.getLanguageIdFromCode('lat'),
              word: 'foo-word',
              principalParts: [ 'part1', 'part2' ]
            },
            meaning: {},
            isPopulated: () => { return true },
            getGroupedInflections: () => { return [] }
          },
        index: 0,
        count: 1,
        morphDataReady: true
      }
    })

    expect(cmp.find('.alpheios-morph__morphdata').exists()).toBeTruthy()
    expect(cmp.find('.alpheios-morph__morphdata').element.style.display).not.toEqual('none')

    let allInflectionAttributesMD = cmp.find('.alpheios-morph__morphdata').findAll(InflectionAttribute)
    let checksPassed = 0

    expect(allInflectionAttributesMD.length).toEqual(7)

    let keysFeatures = Object.keys(cmp.vm.lex.lemma.features)

    for (let i = 0; i < allInflectionAttributesMD.length; i++) {
      let checkKey = keysFeatures.indexOf(allInflectionAttributesMD.at(i).vm.type)
      let key = allInflectionAttributesMD.at(i).vm.type

      if (checkKey > -1) {
        checksPassed++
        expect(allInflectionAttributesMD.at(i).find('span').exists()).toBeTruthy()
        expect(allInflectionAttributesMD.at(i).find('span').text().indexOf(cmp.vm.lex.lemma.features[key].value)).toBeGreaterThan(-1)
      }
      if (allInflectionAttributesMD.at(i).vm.decorators.length > 0 && allInflectionAttributesMD.at(i).vm.decorators.indexOf('brackets') > -1 && allInflectionAttributesMD.at(i).find('span').exists()) {
        expect(allInflectionAttributesMD.at(i).find('span').text().indexOf('[')).toBeGreaterThan(-1)
        expect(allInflectionAttributesMD.at(i).find('span').text().indexOf(']')).toBeGreaterThan(-1)
      }
      if (allInflectionAttributesMD.at(i).vm.decorators.length > 0 && allInflectionAttributesMD.at(i).vm.decorators.indexOf('parenthesize') > -1 && allInflectionAttributesMD.at(i).find('span').exists()) {
        expect(allInflectionAttributesMD.at(i).find('span').text().indexOf('(')).toBeGreaterThan(-1)
        expect(allInflectionAttributesMD.at(i).find('span').text().indexOf(')')).toBeGreaterThan(-1)
      }
      if (allInflectionAttributesMD.at(i).vm.decorators.length > 0 && allInflectionAttributesMD.at(i).vm.decorators.indexOf('appendtype') > -1 && allInflectionAttributesMD.at(i).find('span').exists()) {
        expect(allInflectionAttributesMD.at(i).find('span').text().indexOf(` ${key}`)).toBeGreaterThan(-1)
      }
    }

    expect(checksPassed).toEqual(6) // the problem with part and grmCase

    expect(cmp.find('.feature_source').exists()).toBeTruthy()
    expect(cmp.find('.feature_source').element.style.display).not.toEqual('none')

    expect(cmp.find('.feature_source').find(InflectionAttribute).exists()).toBeTruthy()
    expect(cmp.find('.feature_source').find(InflectionAttribute).vm.type).toEqual('source')
    expect(cmp.find('.feature_source').find(InflectionAttribute).find('span').text().indexOf('fooSource')).toBeGreaterThan(-1)
  })

  it('6 Morph - render definitions', () => {
    let cmp = mount(MorphInner, {
      propsData: {
        lex:
          {
            inflections: [],
            lemma: {
              ID: 'l1',
              features: {},
              languageCode: 'lat',
              languageID: LMF.getLanguageIdFromCode('lat'),
              word: 'foo-word',
              principalParts: [ 'part1', 'part2' ]
            },
            meaning: {},
            isPopulated: () => { return true },
            getGroupedInflections: () => { return [] }
          },

        definitions: [
          {
            lemmaText: 'foo-word1',
            text: 'foo word definition 1'
          },
          {
            lemmaText: 'foo-word2',
            text: 'foo word definition 2'
          }
        ]
      }
    })

    expect(cmp.find('.alpheios-morph__definition_list').exists()).toBeTruthy()
    expect(cmp.findAll('.alpheios-morph__definition').length).toEqual(2)

    expect(cmp.findAll('.alpheios-morph__definition .definition_index').length).toEqual(2)

    let shortDefs = cmp.find('.alpheios-morph__definition_list').findAll(ShortDef)
    let checks = 0

    for (let i = 0; i < shortDefs.length; i++) {
      if (shortDefs.at(i).vm.definition === cmp.vm.definitions[0]) {
        expect(shortDefs.at(i).find('.alpheios-definition__lemma').text()).toEqual('foo-word1:')
        expect(shortDefs.at(i).find('.alpheios-definition__text').text()).toEqual('foo word definition 1')
      } else if (shortDefs.at(i).vm.definition === cmp.vm.definitions[1]) {
        expect(shortDefs.at(i).find('.alpheios-definition__lemma').text()).toEqual('foo-word2:')
        expect(shortDefs.at(i).find('.alpheios-definition__text').text()).toEqual('foo word definition 2')
      }
    }
  })

  it('7 Morph - render translations', () => {
    let cmp = mount(MorphInner, {
      propsData: {
        lex:
          {
            inflections: [],
            lemma: {
              ID: 'l1',
              features: {},
              languageCode: 'lat',
              languageID: LMF.getLanguageIdFromCode('lat'),
              word: 'foo-word',
              principalParts: [ 'part1', 'part2' ]
            },
            meaning: {},
            isPopulated: () => { return true },
            getGroupedInflections: () => { return [] }
          },
        translations: {
          l1: {
            glosses: [ 'some foo translation' ],
            lemmaWord: 'foo-word',
            languageCode: 'eng'
          }
        }
      }
    })

    expect(cmp.find('.alpheios-morph__translation_list').exists()).toBeTruthy()
    expect(cmp.find('.alpheios-morph__translation_list').find('.alpheios-lemma__translations-gloss').text()).toEqual('some foo translation')
  })

  it('8 Morph - render inflection group', () => {
    let tense = { type: 'tense',
      _data: [{ value: 'perfect', sortOrder: 1 }],
      get value () { return this._data[0].value }
    }
    let partOfSpeach = { type: 'part of speach',
      _data: [{ value: 'verb', sortOrder: 1 }],
      get value () { return this._data[0].value }
    }
    let voice = { type: 'voice',
      _data: [{ value: 'active', sortOrder: 1 }],
      get value () { return this._data[0].value }
    }
    let mood = { type: 'mood',
      _data: [{ value: 'indicative', sortOrder: 1 }],
      get value () { return this._data[0].value }
    }
    let number = { type: 'number',
      _data: [{ value: 'singular', sortOrder: 1 }],
      get value () { return this._data[0].value }
    }
    let person = { type: 'person',
      _data: [{ value: '3rd', sortOrder: 1 }],
      get value () { return this._data[0].value }
    }
    let conjugation = { type: 'conjugation',
      _data: [{ value: '3rd', sortOrder: 1 }],
      get value () { return this._data[0].value }
    }
    let fullform = { type: 'full form',
      _data: [{ value: 'foo-word', sortOrder: 1 }],
      get value () { return this._data[0].value }
    }
    let word = { type: 'word',
      _data: [{ value: 'capio', sortOrder: 1 }],
      get value () { return this._data[0].value }
    }
    let cmp = mount(MorphInner, {
      propsData: {
        morphDataReady: true,
        lex:
          {
            inflections: [],
            lemma: {
              ID: 'l1',
              features: {},
              languageCode: 'lat',
              languageID: LMF.getLanguageIdFromCode('lat'),
              word: 'foo-word',
              principalParts: [ 'part1', 'part2' ]
            },
            meaning: {},
            isPopulated: () => { return true },
            getGroupedInflections: () => {
              return [
                {
                  groupingKey: {
                    stem: 'foostem',
                    suffix: 'foosuffix',
                    'part of speach': partOfSpeach
                  },
                  inflections: [
                    {
                      groupingKey: {
                        isCaseInflectionSet: false,
                        tense: tense
                      },

                      inflections: [
                        {
                          groupingKey: {
                            tense: tense,
                            voice: voice
                          },

                          inflections: [
                            {
                              groupingKey: {
                                mood: mood,
                                number: number,
                                person: person,
                                tense: tense,
                                voice: voice
                              },
                              inflections: [
                                {
                                  conjugation: conjugation,
                                  constraints: {},
                                  'full form': fullform,
                                  mood: mood,
                                  number: number,
                                  'part of speach': partOfSpeach,
                                  person: person,
                                  stem: 'foostem',
                                  suffix: 'foosuffix',
                                  tense: tense,
                                  voice: voice,
                                  word: word
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          }
      }
    })

    expect(cmp.find('.alpheios-morph__inflections').exists()).toBeTruthy()
    expect(cmp.find('.alpheios-morph__inflections').findAll('.alpheios-morph__inflset').length).toEqual(1)

    expect(cmp.find('.alpheios-morph__inflections').findAll('.inflset_index').exists()).toBeFalsy()

    let morphForms = cmp.find('.alpheios-morph__inflections .alpheios-morph__forms')

    expect(morphForms.find('[data-feature="stem"]').text()).toEqual('foostem')
    expect(morphForms.find('[data-feature="stem"]').element.getAttribute('data-grouplevel')).toEqual('1')
    expect(morphForms.find('[data-feature="suffix"]').text()).toEqual('-foosuffix')
    expect(morphForms.find('[data-feature="suffix"]').element.getAttribute('data-grouplevel')).toEqual('1')

    expect(morphForms.findAll(InflectionAttribute).length).not.toBeLessThan(5)

    expect(morphForms.find('[data-feature="person"]').element.getAttribute('data-grouplevel')).toEqual('4')
    expect(morphForms.find('[data-feature="person"]').text()).toEqual('3rd person')

    expect(morphForms.find('[data-feature="number"]').element.getAttribute('data-grouplevel')).toEqual('4')
    expect(morphForms.find('[data-feature="number"]').text()).toEqual('singular')

    expect(morphForms.find('[data-feature="tense"]').element.getAttribute('data-grouplevel')).toEqual('4')
    expect(morphForms.find('[data-feature="tense"]').text()).toEqual('perfect')

    expect(morphForms.find('[data-feature="mood"]').element.getAttribute('data-grouplevel')).toEqual('4')
    expect(morphForms.find('[data-feature="mood"]').text()).toEqual('indicative')

    expect(morphForms.find('[data-feature="voice"]').element.getAttribute('data-grouplevel')).toEqual('4')
    expect(morphForms.find('[data-feature="voice"]').text()).toEqual('active')
  })

  it('9 MorphInner - check required props', () => {
    let spy = jest.spyOn(console, 'error')
    let cmp = mount(MorphInner)

    expect(spy).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "lex"'))
    expect(spy).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "index"'))
    expect(spy).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "count"'))
    expect(spy).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "morphDataReady"'))
    spy.mockReset()
  })
})
