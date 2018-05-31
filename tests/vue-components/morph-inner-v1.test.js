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
                  value: 'fooFrequency'
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

    expect(cmp.find('.principal_parts').findAll(InflectionAttribute).length).toEqual(1)
    expect(cmp.find('.principal_parts').find(InflectionAttribute).vm.type).toEqual('pronunciation')
    /*
    cmp.vm.lexemes[0].lemma.features.frequency = {
      value: 'fooFrequency'
    }

    let lemma = cmp.vm.lexemes[0].lemma

    console.log('*************test', cmp.vm.getFeature(lemma, 'age'), cmp.find('.principal_parts').findAll(InflectionAttribute).length)
    console.log('**********', cmp.vm.getFeature(lemma, 'frequency') !== undefined || cmp.vm.getFeature(lemma, 'age') !== undefined || cmp.vm.getFeature(lemma, 'area') !== undefined || cmp.vm.getFeature(lemma, 'geo') !== undefined)
    console.log('*************', cmp.html())
*/
    // expect(cmp.find('.principal_parts').findAll(InflectionAttribute).length).toEqual(2)
  })
})
