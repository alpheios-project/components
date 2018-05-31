/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { shallowMount, mount } from '@vue/test-utils'
import MorphInner from '@/vue-components/morph-inner-v1.vue'
import InflectionAttribute from '@/vue-components/infl-attribute.vue'
import { LanguageModelFactory as LMF } from 'alpheios-data-models'

describe('morph.test.js', () => {
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
        lexemes: [
          {
            inflections: [],
            lemma: {},
            meaning: {},
            isPopulated: () => { return true },
            getGroupedInflections: () => { return [] }
          },
          {
            inflections: [],
            lemma: {},
            meaning: {},
            isPopulated: () => { return true },
            getGroupedInflections: () => { return [] }
          }
        ]
      },
      stubs: [ 'inflectionattribute' ]
    })
    expect(cmp.isVueInstance()).toBeTruthy()

    expect(cmp.find('.principal_parts').exists()).toBeTruthy()

    expect(cmp.findAll('.principal_parts').length).toEqual(2)
    expect(cmp.findAll('.principal_parts .lemma_index').length).toEqual(2)

    cmp.vm.lexemes.splice(1, 1)

    expect(cmp.findAll('.principal_parts').length).toEqual(1)
    expect(cmp.findAll('.principal_parts .lemma_index').exists()).toBeFalsy()
  })

  it('3 Morph - render principal parts (min requirements without InflectionAttribute)', () => {
    let cmp = mount(MorphInner, {
      propsData: {
        lexemes: [
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
          }
        ]
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
        lexemes: [
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
          }
        ]
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
        lexemes: [
          {
            inflections: [],
            lemma: {
              ID: '1',
              features: {
                /* grmCase: {
                  value: 'fooGrmCase',
                  type: 'grmCase',
                  languageID: LMF.getLanguageIdFromCode('lat')
                }, */
                gender: {
                  value: 'fooGender',
                  type: 'gender',
                  languageID: LMF.getLanguageIdFromCode('lat')
                },
                part: {
                  value: 'fooPart',
                  type: 'part',
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
          }
        ]
      }
    })

    expect(cmp.find('.alpheios-morph__morphdata').exists()).toBeTruthy()
    expect(cmp.find('.alpheios-morph__morphdata').element.style.display).not.toEqual('none')

    let allInflectionAttributesMD = cmp.find('.alpheios-morph__morphdata').findAll(InflectionAttribute)
    let checksPassed = 0

    expect(allInflectionAttributesMD.length).toEqual(7)

    let keysFeatures = Object.keys(cmp.vm.lexemes[0].lemma.features)

    for (let i = 0; i < allInflectionAttributesMD.length; i++) {
      let checkKey = keysFeatures.indexOf(allInflectionAttributesMD.at(i).vm.type)
      let key = allInflectionAttributesMD.at(i).vm.type

      if (checkKey > -1) {
        checksPassed++
        expect(allInflectionAttributesMD.at(i).find('span').exists()).toBeTruthy()
        expect(allInflectionAttributesMD.at(i).find('span').text().indexOf(cmp.vm.lexemes[0].lemma.features[key].value)).toBeGreaterThan(-1)
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

    expect(checksPassed).toEqual(5) // the problem with part and grmCase

    expect(cmp.find('.feature_source').exists()).toBeTruthy()
    expect(cmp.find('.feature_source').element.style.display).not.toEqual('none')

    expect(cmp.find('.feature_source').find(InflectionAttribute).exists()).toBeTruthy()
    expect(cmp.find('.feature_source').find(InflectionAttribute).vm.type).toEqual('source')
    expect(cmp.find('.feature_source').find(InflectionAttribute).find('span').text().indexOf('fooSource')).toBeGreaterThan(-1)
  })

  it('5 Morph - render definitions', () => {
    let cmp = mount(MorphInner, {
      propsData: {
        lexemes: [
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
          }
        ],
        definitions: {}
      }
    })

    expect(cmp.find('.alpheios-morph__definition_list').exists()).toBeTruthy()
  })
})
