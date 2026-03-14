import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  pill: {
    width: '100%',
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 16,
    borderRadius: 999,
  },
  pillText: {
    fontSize: 14,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  drawer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingBottom: 36,
    maxHeight: '80%',
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#C7C7CC',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 16,
  },
  dragArea: {
    paddingBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    gap: 12,
    paddingBottom: 8,
  },
  option: {
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '700',
  },
  selectedIndicator: {
    position: 'absolute',
    right: 16,
    top: '50%',
  },
});
