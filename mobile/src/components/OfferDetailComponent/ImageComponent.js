import React, {useState} from 'react';
import {Image, Text, View} from 'react-native';
import styles from './styles';

function ImageComponent({src}) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const onLoadStart = () => {
    setIsLoading(true);
  };

  const onLoadEnd = () => {
    setIsLoading(false);
  };

  const onError = () => {
    setIsLoading(false);
    setHasError(true)
  };

  return (
    <View style={styles.imageContainer}>
        {isLoading && <Text style={styles.loading}>Loading image...</Text>}
      <View>
        <Image
          onLoadStart={onLoadStart}
          onLoadEnd={onLoadEnd}
          onError={onError}
          source={{uri: src}}
          style={styles.detailPhoto}
        />
      </View>
    </View>
  );
}

export default ImageComponent;
