import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
//   SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ProductService from '../../Services/ProductService';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // Grid calculation for 2 columns with padding

const CATEGORIES = [
  { id: '1', name: 'Beauty', icon: 'sparkles' },
  { id: '2', name: 'Fashion', icon: 'tshirt' },
  { id: '3', name: 'Kids', icon: 'child' },
  { id: '4', name: 'Mens', icon: 'user-alt' },
  { id: '5', name: 'Womens', icon: 'female' },
];

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSortedAsc, setIsSortedAsc] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await ProductService.getAllProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.log('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Functional Search Filter
  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  // Functional Price Sorting Toggle
  const handleSort = () => {
    const sorted = [...filteredProducts].sort((a, b) =>
      isSortedAsc ? b.price - a.price : a.price - b.price
    );
    setFilteredProducts(sorted);
    setIsSortedAsc(!isSortedAsc);
  };

  const renderProductCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="contain" />
      <Text style={styles.cardTitle} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.cardDescription} numberOfLines={2}>
        {item.description}
      </Text>
      <Text style={styles.cardPrice}>₹{Math.round(item.price * 80)}</Text>
      <View style={styles.ratingRow}>
        <View style={styles.stars}>
          {[...Array(5)].map((_, i) => (
            <Icon
              key={i}
              name="star"
              solid={i < Math.round(item.rating?.rate || 4)}
              size={10}
              color="#FFD700"
            />
          ))}
        </View>
        <Text style={styles.ratingCount}>({item.rating?.count || 100})</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.iconBtn}>
          <Icon name="bars" size={18} color="#000" />
        </TouchableOpacity>
        <View style={styles.brandContainer}>
          <View style={styles.logoCircle}>
            <Icon name="shopping-bag" size={12} color="#FFF" />
          </View>
          <Text style={styles.brandTitle}>Stylish</Text>
        </View>
        <TouchableOpacity style={styles.profileAvatar}>
          <Icon name="user" size={16} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Icon name="search" size={14} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search any Product..."
            placeholderTextColor="#8E8E93"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <TouchableOpacity>
            <MaterialIcon name="mic" size={20} color="#8E8E93" />
          </TouchableOpacity>
        </View>

        {/* Filter & Sort Bar */}
        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>All Featured</Text>
          <View style={styles.filterActions}>
            <TouchableOpacity style={styles.actionBtn} onPress={handleSort}>
              <Text style={styles.actionText}>Sort</Text>
              <Icon name={isSortedAsc ? 'sort-amount-down' : 'sort-amount-up'} size={12} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={() => setFilteredProducts(products)}>
              <Text style={styles.actionText}>Filter</Text>
              <MaterialIcon name="filter-list" size={16} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Category Circle List */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={styles.categoryItem}
              onPress={() => {
                const filtered = products.filter((p) =>
                  p.category.toLowerCase().includes(cat.name.toLowerCase())
                );
                setFilteredProducts(filtered.length ? filtered : products);
              }}
            >
              <View style={styles.categoryCircle}>
                <Icon name={cat.icon} size={18} color="#F44336" />
              </View>
              <Text style={styles.categoryName}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Hero Promotional Banner */}
        <View style={styles.bannerContainer}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerDiscount}>50-40% OFF</Text>
            <Text style={styles.bannerSub}>Now in (product){'\n'}All colours</Text>
            <TouchableOpacity style={styles.bannerBtn}>
              <Text style={styles.bannerBtnText}>Shop Now</Text>
              <Icon name="arrow-right" size={12} color="#FFF" style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Deal of the Day Banner */}
        <View style={styles.dealBanner}>
          <View>
            <Text style={styles.dealTitle}>Deal of the Day</Text>
            <Text style={styles.dealSub}>22h 55m 20s remaining</Text>
          </View>
          <TouchableOpacity style={styles.viewAllBtn} onPress={() => setFilteredProducts(products)}>
            <Text style={styles.viewAllText}>View all</Text>
            <Icon name="arrow-right" size={10} color="#FFF" style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </View>

        {/* Products Grid */}
        {loading ? (
          <ActivityIndicator size="large" color="#F44336" style={{ marginVertical: 40 }} />
        ) : (
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderProductCard}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.gridRow}
            contentContainerStyle={styles.gridContainer}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  iconBtn: { padding: 4 },
  brandContainer: { flexDirection: 'row', alignItems: 'center' },
  logoCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F44336',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  brandTitle: { fontSize: 18, fontWeight: '800', color: '#4392F9' },
  profileAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 12,
    paddingHorizontal: 12,
    height: 44,
    borderRadius: 8,
    elevation: 2,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 13, color: '#000' },
  filterSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#000' },
  filterActions: { flexDirection: 'row', gap: 8 },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
    elevation: 1,
  },
  actionText: { fontSize: 12, color: '#000' },
  categoriesContainer: { paddingLeft: 16, marginVertical: 16 },
  categoryItem: { alignItems: 'center', marginRight: 16 },
  categoryCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryName: { fontSize: 11, color: '#212121', fontWeight: '500' },
  bannerContainer: {
    marginHorizontal: 16,
    height: 140,
    backgroundColor: '#FD6E8A',
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
    marginBottom: 16,
  },
  bannerContent: { width: '60%' },
  bannerDiscount: { fontSize: 20, fontWeight: '800', color: '#FFF' },
  bannerSub: { fontSize: 11, color: '#FFF', marginVertical: 6 },
  bannerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  bannerBtnText: { fontSize: 11, color: '#FFF', fontWeight: '700' },
  dealBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4392F9',
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  dealTitle: { color: '#FFF', fontWeight: '700', fontSize: 14 },
  dealSub: { color: '#FFF', fontSize: 11, opacity: 0.9 },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  viewAllText: { color: '#FFF', fontSize: 11, fontWeight: '600' },
  gridContainer: { paddingHorizontal: 16, paddingBottom: 24 },
  gridRow: { justifyContent: 'space-between', marginBottom: 16 },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  cardImage: { width: '100%', height: 130, marginBottom: 8 },
  cardTitle: { fontSize: 12, fontWeight: '700', color: '#000' },
  cardDescription: { fontSize: 10, color: '#666', marginVertical: 4, height: 26 },
  cardPrice: { fontSize: 12, fontWeight: '800', color: '#000' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 4 },
  stars: { flexDirection: 'row', gap: 1 },
  ratingCount: { fontSize: 9, color: '#888' },
});