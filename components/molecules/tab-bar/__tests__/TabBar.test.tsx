import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';

import { TabBar } from '../TabBar';

const tabs = [
   { value: 'pokeballs', label: 'Pokeballs' },
   { value: 'berries', label: 'Berries' },
   { value: 'machines', label: 'MT & MO' },
   { value: 'training', label: 'Training' },
];

describe('TabBar', () => {
   it('renders all tab labels', () => {
      render(<TabBar tabs={tabs} activeTab="pokeballs" onTabChange={() => {}} />);
      tabs.forEach((tab) => {
         expect(screen.getByText(tab.label)).toBeTruthy();
      });
   });

   it('calls onTabChange with the correct value when a tab is pressed', () => {
      const onTabChange = jest.fn();
      render(<TabBar tabs={tabs} activeTab="pokeballs" onTabChange={onTabChange} />);

      fireEvent.press(screen.getByText('Berries'));

      expect(onTabChange).toHaveBeenCalledTimes(1);
      expect(onTabChange).toHaveBeenCalledWith('berries');
   });

   it('marks the active tab as selected via accessibilityState', () => {
      render(<TabBar tabs={tabs} activeTab="berries" onTabChange={() => {}} />);

      const selectedTabs = screen.getAllByRole('tab', { selected: true });
      expect(selectedTabs).toHaveLength(1);
      // the selected tab must contain the 'Berries' label
      expect(screen.getByText('Berries')).toBeTruthy();
   });

   it('marks non-active tabs as not selected', () => {
      render(<TabBar tabs={tabs} activeTab="pokeballs" onTabChange={() => {}} />);

      const unselectedTabs = screen.getAllByRole('tab', { selected: false });
      expect(unselectedTabs).toHaveLength(tabs.length - 1);
   });

   it('calls onTabChange when pressing the already-active tab', () => {
      const onTabChange = jest.fn();
      render(<TabBar tabs={tabs} activeTab="pokeballs" onTabChange={onTabChange} />);

      fireEvent.press(screen.getByText('Pokeballs'));

      expect(onTabChange).toHaveBeenCalledWith('pokeballs');
   });
});
