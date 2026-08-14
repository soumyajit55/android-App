// App/Screens/Auth/Splash.js
import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { useTheme } from 'react-native-basic-elements';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Choose Products',
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
    // Replace with your local image requiring e.g., require('../../Assets/Images/splash1.png')
    image: require('../../Assets/search.png'),
  },
  {
    id: '2',
    title: 'Make Payment',
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
    image: require('../../Assets/makePayment.png'),
  },
  {
    id: '3',
    title: 'Get Your Order',
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
    image: require('../../Assets/product.jpg'),
  },
];

const Splash = ({ navigation }) => {
  const colors = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const primaryColor = colors.primaryThemeColor || '#F44336';

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({ index: currentIndex - 1 });
    }
  };

  const handleFinish = () => {
    navigation.replace('SignIn');
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header Section */}
      <View style={styles.header}>
        <Text style={styles.pageIndicator}>
          <Text style={styles.boldText}>{currentIndex + 1}</Text>/{SLIDES.length}
        </Text>
        <TouchableOpacity onPress={handleFinish}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Swipeable Content */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={item.image} style={styles.image} resizeMode="contain" />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />

      {/* Footer Navigation Bar */}
      <View style={styles.footer}>
        {/* Prev Button */}
        <TouchableOpacity
          onPress={handlePrev}
          disabled={currentIndex === 0}
          style={styles.navButton}
        >
          <Text style={[styles.navText, currentIndex === 0 && styles.disabledText]}>
            {currentIndex > 0 ? 'Prev' : ''}
          </Text>
        </TouchableOpacity>

        {/* Pagination Dots */}
        <View style={styles.paginationContainer}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index
                  ? [styles.activeDot, { backgroundColor: '#1E232A' }]
                  : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        {/* Next / Get Started Button */}
        <TouchableOpacity onPress={handleNext} style={styles.navButton}>
          <Text style={[styles.navText, { color: primaryColor, fontWeight: '700' }]}>
            {currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  pageIndicator: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  boldText: {
    fontWeight: '800',
    color: '#000000',
  },
  skipText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
  },
  slide: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  image: {
    width: width * 0.7,
    height: width * 0.7,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 12,
    color: '#A0A0A0',
    textAlign: 'center',
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  navButton: {
    minWidth: 70,
  },
  navText: {
    fontSize: 14,
    color: '#A0A0A0',
    fontWeight: '600',
  },
  disabledText: {
    opacity: 0,
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 28,
  },
  inactiveDot: {
    width: 8,
    backgroundColor: '#E0E0E0',
  },
});