import { Pressable, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Typography } from '@/components/atoms/typography';
import { Colors } from '@/constants/theme';

type Tab = {
   value: string;
   label: string;
};

type Props = {
   tabs: Tab[];
   activeTab: string;
   onTabChange: (value: string) => void;
};

export function TabBar({ tabs, activeTab, onTabChange }: Props) {
   const { t } = useTranslation();
   return (
      <View style={styles.container}>
         {tabs.map((tab) => {
            const isActive = tab.value === activeTab;
            return (
               <Pressable
                  key={tab.value}
                  onPress={() => onTabChange(tab.value)}
                  style={[styles.tab, isActive && { backgroundColor: Colors.tint }]}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: isActive }}
               >
                  <Typography style={[styles.label, isActive && styles.labelActive]}>
                     {t(tab.label)}
                  </Typography>
               </Pressable>
            );
         })}
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
   },
   tab: {
      paddingHorizontal: 16,
      paddingVertical: 3,
      borderRadius: 999,
      backgroundColor: '#F0F0F0',
   },
   label: {
      fontSize: 14,
      fontWeight: '600',
      color: Colors.icon,
      paddingBottom: 2,
   },
   labelActive: {
      color: '#fff',
   },
});
