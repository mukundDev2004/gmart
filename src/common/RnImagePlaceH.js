import React from 'react'
import FastImage from 'react-native-fast-image'
const ImageLoad = ({
  style,
  source
}) => (
  source.uri === undefined
    ? <FastImage
      style={[{ position: 'relative' }, style]}
      source={source}
    />
    : <FastImage
      style={[{ position: 'relative' }, style]}
      source={{
        uri: source.uri,
        priority: FastImage.priority.normal,
        cache: FastImage.cacheControl.immutable
      }}
    />
)

export default ImageLoad
