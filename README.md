# Components
Alpheios Common Components Library

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.org/alpheios-project/components.svg?branch=master)](https://travis-ci.org/alpheios-project/components)
[![Coverage Status](https://coveralls.io/repos/github/alpheios-project/components/badge.svg?branch=master)](https://coveralls.io/github/alpheios-project/components?branch=master)

## CSS Styles
Components use a Sass version of [UIKit 3](https://getuikit.com/) framework for visual styling. The UIKit build
has been customized with custom variables and mixins to make it match default Alpheios styles.

This custom UIKit build uses an `.auk` root namespace class to avoid interference with a host page that 
might use another version of UIKit. To provide this safety, all UIKit selectors use the following format: 
`.auk .some-uikit-selector`. This requires any root component, e.g. panel or popup, to have `.auk` class 
set for the outermost HTML element of the component.

In addition to that, components support custom skins. In order for a custom skin to be applied:
1. A CSS file of a skin must be loaded in an addition to a default CSS style. As selectors of a CSS
skin have higher specificity than the default style selectors, it does not matter whether the default
CSS style file or the skin CSS file be loaded first.
2. A modifier class specifying a skin name must be added to the root of HTML elements that have an `.auk` 
class. For example, to enable a skin named "blue", a `.auk--blue` class should be added to all HTML 
elements that have `.auk` class assigned.