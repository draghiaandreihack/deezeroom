import { Tabs } from 'expo-router';
import { Platform, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

import { HapticTab } from '@/components/ui/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useUser } from '@/contexts/UserContext';

const ProfileButton = () => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push('/profile')}
      style={{ marginRight: 16 }}
    >
      <Image
        source={{ uri: user?.photoURL || 'https://via.placeholder.com/32' }}
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          borderWidth: 2,
          borderColor: Colors.light.accentMain
        }}
      />
    </TouchableOpacity>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute'
          },
          default: {}
        }),
        headerTitleStyle: {
          fontFamily: 'LeagueGothic',
          fontSize: 30
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="shippingbox.fill" color={color} />
          ),
          headerRight: () => <ProfileButton />
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
          headerRight: () => <ProfileButton />
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="shippingbox.fill" color={color} />
          ),
          headerRight: () => <ProfileButton />
        }}
      />
    </Tabs>
  );
}
