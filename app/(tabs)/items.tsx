import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TextBox } from '@/components/atoms/textbox';
import { Typography } from '@/components/atoms/typography';
import { TabBar } from '@/components/molecules/tab-bar';
import { ItemList } from '@/components/organisms/item-list';
import { ITEM_TABS } from '@/constants/items';
import { Colors } from '@/constants/theme';
import { useItems } from '@/hooks/useItems';

export default function ItemsScreen() {
   const { t } = useTranslation();
   const { activeTab, query, setQuery, activePockets, activeColor, search, handleTabChange } =
      useItems();

   return (
      <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]}>
         <Typography style={styles.title}>{t('items.title')}</Typography>
         <TabBar tabs={ITEM_TABS} activeTab={activeTab} onTabChange={handleTabChange} />
         <TextBox
            autoCapitalize="none"
            autoCorrect={false}
            placeholder={t('items.searchPlaceholder')}
            returnKeyType="search"
            value={query}
            onChangeText={setQuery}
         />
         <ItemList
            key={activeTab}
            pockets={activePockets}
            search={search}
            query={query}
            color={activeColor}
         />
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16,
      gap: 16,
   },
   title: {
      paddingTop: 12,
      fontSize: 32,
      fontWeight: '700',
   },
});
