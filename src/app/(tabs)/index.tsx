import { StyleSheet, Pressable, TextInput, Image } from 'react-native';
import { useEffect, useState } from 'react';

import ParallaxScrollView from '@/components/ui/ParallaxScrollView';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { Colors } from '@/constants/Colors';
import shootAlert from '@/utils/shoot-alert';
import { useNetwork } from '@/contexts/NetworkContext';
import { HelloWave } from '@/components/HelloWave';

export default function HomeScreen() {
  const [name, setName] = useState('');

  //const { isConnected } = useNetwork();

  //useEffect(() => {
  //  if (!isConnected) {
  //    shootAlert('Network Error!', 'Please check your internet connection.');
  //  }
  //}, [isConnected]);

  const fetchGreeting = async () => {
    const response = await fetch('/api/greeting');
    const data = await response.json();
    alert(data.greeting);
  };

  const postGreeting = async () => {
    const response = await fetch(
      `/api/greeting?name=${encodeURIComponent(name)}`,
      { method: 'POST' }
    );
    const data = await response.json();
    alert(data.greeting);
  };

  const postGraphql = async () => {
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: '{ greeting }'
      })
    });
    const data = await response.json();

    alert(data.data.greeting);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: Colors.dark.background,
        dark: Colors.light.background
      }}
      headerImage={
        <Image
          source={require('@/assets/images/logo/deezeroom-black-transparent.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">deezeroom app</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Open an API route</ThemedText>
        <Pressable onPress={fetchGreeting}>
          <ThemedText style={{ textDecorationLine: 'underline' }}>
            GET /api/greeting
          </ThemedText>
        </Pressable>
        <ThemedView style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            placeholderTextColor={Colors.light.accentWeak}
          />
          <Pressable onPress={postGreeting}>
            <ThemedText style={{ textDecorationLine: 'underline' }}>
              POST /api/greeting
            </ThemedText>
          </Pressable>
        </ThemedView>
        <Pressable onPress={postGraphql}>
          <ThemedText style={{ textDecorationLine: 'underline' }}>
            POST /api/graphql
          </ThemedText>
        </Pressable>
      </ThemedView>
      <HelloWave />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.accentMain,
    color: Colors.light.accentWeak,
    borderRadius: 4,
    padding: 8,
    flex: 1
  },
  logo: {
    position: 'absolute',
    width: '70%',
    //height: '50%',
    bottom: 10,
    left: 10
  }
});
