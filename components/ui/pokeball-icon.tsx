import { SvgXml } from 'react-native-svg';

const POKEBALL_INACTIVE_XML = `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.0003 23.8332C18.9836 23.8332 23.8337 18.9831 23.8337 12.9998C23.8337 7.01659 18.9836 2.1665 13.0003 2.1665C7.01708 2.1665 2.16699 7.01659 2.16699 12.9998C2.16699 18.9831 7.01708 23.8332 13.0003 23.8332Z" stroke="#808080" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13 16.25C13.862 16.25 14.6886 15.9076 15.2981 15.2981C15.9076 14.6886 16.25 13.862 16.25 13C16.25 12.138 15.9076 11.3114 15.2981 10.7019C14.6886 10.0924 13.862 9.75 13 9.75C12.138 9.75 11.3114 10.0924 10.7019 10.7019C10.0924 11.3114 9.75 12.138 9.75 13C9.75 13.862 10.0924 14.6886 10.7019 15.2981C11.3114 15.9076 12.138 16.25 13 16.25V16.25Z" stroke="#808080" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.16699 13H9.75033M16.2503 13H23.8337" stroke="#808080" stroke-width="1.5"/>
</svg>`;

const POKEBALL_ACTIVE_XML = `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.16634 12.9997C2.16634 14.4223 2.44655 15.8311 2.99098 17.1454C3.5354 18.4598 4.33338 19.654 5.33935 20.66C6.34532 21.666 7.53958 22.4639 8.85394 23.0084C10.1683 23.5528 11.577 23.833 12.9997 23.833C14.4223 23.833 15.8311 23.5528 17.1454 23.0084C18.4598 22.4639 19.654 21.666 20.66 20.66C21.666 19.654 22.4639 18.4598 23.0084 17.1454C23.5528 15.831 23.833 14.4223 23.833 12.9997L12.9997 12.9997H2.16634Z" fill="white"/>
<path d="M23.8337 12.9998C23.8337 11.5772 23.5534 10.1685 23.009 8.8541C22.4646 7.53974 21.6666 6.34548 20.6607 5.33951C19.6547 4.33355 18.4604 3.53557 17.1461 2.99114C15.8317 2.44672 14.423 2.1665 13.0003 2.1665C11.5777 2.1665 10.1689 2.44672 8.85459 2.99114C7.54023 3.53557 6.34597 4.33355 5.34 5.33951C4.33403 6.34548 3.53606 7.53974 2.99163 8.8541C2.4472 10.1685 2.16699 11.5772 2.16699 12.9998L13.0003 12.9998H23.8337Z" fill="#CD3131"/>
<circle cx="13" cy="12.9995" r="3.25" fill="white"/>
<path d="M13.0003 23.8332C18.9836 23.8332 23.8337 18.9831 23.8337 12.9998C23.8337 7.01659 18.9836 2.1665 13.0003 2.1665C7.01708 2.1665 2.16699 7.01659 2.16699 12.9998C2.16699 18.9831 7.01708 23.8332 13.0003 23.8332Z" stroke="#173EA5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13 16.25C13.862 16.25 14.6886 15.9076 15.2981 15.2981C15.9076 14.6886 16.25 13.862 16.25 13C16.25 12.138 15.9076 11.3114 15.2981 10.7019C14.6886 10.0924 13.862 9.75 13 9.75C12.138 9.75 11.3114 10.0924 10.7019 10.7019C10.0924 11.3114 9.75 12.138 9.75 13C9.75 13.862 10.0924 14.6886 10.7019 15.2981C11.3114 15.9076 12.138 16.25 13 16.25V16.25Z" stroke="#173EA5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.16699 13H9.75033M16.2503 13H23.8337" stroke="#173EA5" stroke-width="1.5"/>
</svg>`;

const HEART_INACTIVE_XML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.8401 4.60987C20.3294 4.09888 19.7229 3.69352 19.0555 3.41696C18.388 3.14039 17.6726 2.99805 16.9501 2.99805C16.2276 2.99805 15.5122 3.14039 14.8448 3.41696C14.1773 3.69352 13.5709 4.09888 13.0601 4.60987L12.0001 5.66987L10.9401 4.60987C9.90843 3.57818 8.50915 2.99858 7.05012 2.99858C5.59109 2.99858 4.19181 3.57818 3.16012 4.60987C2.12843 5.64156 1.54883 7.04084 1.54883 8.49987C1.54883 9.95891 2.12843 11.3582 3.16012 12.3899L4.22012 13.4499L12.0001 21.2299L19.7801 13.4499L20.8401 12.3899C21.3511 11.8791 21.7565 11.2727 22.033 10.6052C22.3096 9.93777 22.4519 9.22236 22.4519 8.49987C22.4519 7.77738 22.3096 7.06198 22.033 6.39452C21.7565 5.72706 21.3511 5.12063 20.8401 4.60987V4.60987Z" stroke="#808080" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const HEART_ACTIVE_XML = `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.5766 4.99419C22.0233 4.44061 21.3663 4.00147 20.6433 3.70187C19.9202 3.40226 19.1452 3.24805 18.3625 3.24805C17.5798 3.24805 16.8047 3.40226 16.0817 3.70187C15.3586 4.00147 14.7016 4.44061 14.1483 4.99419L13 6.14252L11.8516 4.99419C10.734 3.87652 9.21809 3.24863 7.63747 3.24863C6.05685 3.24863 4.54097 3.87652 3.4233 4.99419C2.30563 6.11186 1.67773 7.62774 1.67773 9.20836C1.67773 10.789 2.30563 12.3049 3.4233 13.4225L4.57163 14.5709L13 22.9992L21.4283 14.5709L22.5766 13.4225C23.1302 12.8692 23.5693 12.2122 23.869 11.4892C24.1686 10.7661 24.3228 9.99105 24.3228 9.20836C24.3228 8.42566 24.1686 7.65064 23.869 6.92756C23.5693 6.20448 23.1302 5.54751 22.5766 4.99419Z" fill="#FD525C" stroke="#173EA5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const PIN_INACTIVE_XML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#808080" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 13C12.7956 13 13.5587 12.6839 14.1213 12.1213C14.6839 11.5587 15 10.7956 15 10C15 9.20435 14.6839 8.44129 14.1213 7.87868C13.5587 7.31607 12.7956 7 12 7C11.2044 7 10.4413 7.31607 9.87868 7.87868C9.31607 8.44129 9 9.20435 9 10C9 10.7956 9.31607 11.5587 9.87868 12.1213C10.4413 12.6839 11.2044 13 12 13V13Z" stroke="#808080" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 10L9.3 10M14.7 10L21 10" stroke="#808080" stroke-width="1.5"/>
</svg>`;

const PIN_ACTIVE_XML = `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 24.9168C3.79167 16.7918 4.33333 14.6252 3.25 10.8335H22.75C22.75 15.7085 18.4167 21.6668 13 24.9168Z" fill="white"/>
<path d="M22.75 10.8335H3.25C3.43056 7.94461 5.41667 1.62516 13 1.0835C20.0417 1.0835 22.5694 7.5835 22.75 10.8335Z" fill="#CD3131"/>
<circle cx="13" cy="10.8335" r="3.25" fill="white"/>
<path d="M22.75 10.8335C22.75 18.4168 13 24.9168 13 24.9168C13 24.9168 3.25 18.4168 3.25 10.8335C3.25 8.24764 4.27723 5.76768 6.10571 3.9392C7.93419 2.11073 10.4141 1.0835 13 1.0835C15.5859 1.0835 18.0658 2.11073 19.8943 3.9392C21.7228 5.76768 22.75 8.24764 22.75 10.8335Z" stroke="#173EA5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13 14.0835C13.862 14.0835 14.6886 13.7411 15.2981 13.1316C15.9076 12.5221 16.25 11.6954 16.25 10.8335C16.25 9.97154 15.9076 9.14489 15.2981 8.5354C14.6886 7.92591 13.862 7.5835 13 7.5835C12.138 7.5835 11.3114 7.92591 10.7019 8.5354C10.0924 9.14489 9.75 9.97154 9.75 10.8335C9.75 11.6954 10.0924 12.5221 10.7019 13.1316C11.3114 13.7411 12.138 14.0835 13 14.0835Z" fill="white" stroke="#173EA5" stroke-width="1.625" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.25 10.8335L10.075 10.8335M15.925 10.8335L22.75 10.8335" stroke="#173EA5" stroke-width="1.625"/>
</svg>`;

type Props = {
  size?: number;
};

export function PokeballIcon({ size = 26 }: Props) {
  return <SvgXml xml={POKEBALL_INACTIVE_XML} width={size} height={size} />;
}

export function PokeballIconActive({ size = 26 }: Props) {
  return <SvgXml xml={POKEBALL_ACTIVE_XML} width={size} height={size} />;
}

export function PokedexTabIcon({ focused, size = 26 }: { focused: boolean; size?: number }) {
  return focused ? <PokeballIconActive size={size} /> : <PokeballIcon size={size} />;
}

export function HeartIcon({ size = 26 }: Props) {
  return <SvgXml xml={HEART_INACTIVE_XML} width={size} height={size} />;
}

export function HeartIconActive({ size = 26 }: Props) {
  return <SvgXml xml={HEART_ACTIVE_XML} width={size} height={size} />;
}

export function FavoritesTabIcon({ focused, size = 26 }: { focused: boolean; size?: number }) {
  return focused ? <HeartIconActive size={size} /> : <HeartIcon size={size} />;
}

export function PinIcon({ size = 26 }: Props) {
  return <SvgXml xml={PIN_INACTIVE_XML} width={size} height={size} />;
}

export function PinIconActive({ size = 26 }: Props) {
  return <SvgXml xml={PIN_ACTIVE_XML} width={size} height={size} />;
}

export function RegionsTabIcon({ focused, size = 26 }: { focused: boolean; size?: number }) {
  return focused ? <PinIconActive size={size} /> : <PinIcon size={size} />;
}
