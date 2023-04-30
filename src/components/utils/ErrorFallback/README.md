# ErrorFallback

<!-- TODO: Complete component documentation -->

React component that...

##  Design

![ErrorFallback](ErrorFallback.png)

## Description

The **ErrorFallback** component ...

## SubComponents

- **[InternalComponent](../InternalComponent/README.md)**

## Contexts

- **[SomeContext](../../../contexts/SomeContext/README.md)**

## Usage

### Example

```jsx
<ErrorFallback
    className="ErrorFallbackClassName"
    id="errorFallback-id"
    exampleProp= { exampleValue }
    ...
/>

```

### Properties

| Attribute   | Required? | Default       | Description                                                                    | Sample                                        |
| ----------- | :-------: | ------------- | ------------------------------------------------------------------------------ | --------------------------------------------- |
| id          |  &cross;  | undefined     | Component Id                                                                   | id="custom-id"                                |
| className   |  &cross;  | ''            | Custom CSS class name                                                          | className="CustomClass"                       |
| children    |  &cross;  | undefined     | HTML to be displayed as content. Elemental type or React node.                 | \<Component>\<div>Content\</div>\</Component> |
| texts       |  &cross;  | { text keys } | Object with the keys for texts translations. Pleae, check component propTypes. | texts={ { title: 'Custom title' } }           |
| exampleProp |  &check;  | defaultVal    | Example prop description ...                                                   | exampleProp= { exampleValue }                 |

## Notes

- This component incldues the `texts` prop, which contains all the keys used by the translations system provided by the library. You can also set directlly a text instead of a key. Default text keys and translations are provided by the library. Please, check the [translations system](../../../../README.md#translation-system) usage in the main documentation of the project.
