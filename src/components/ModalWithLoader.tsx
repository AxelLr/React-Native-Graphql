import React from 'react'
import {Modal, ActivityIndicator, StyleSheet, ScrollView} from 'react-native'

interface Props {
  modal: boolean
  setModal: (state: boolean) => void
  children: React.ReactNode
  loading: boolean
}

const ModalWithLoader: React.FC<Props> = ({
  setModal,
  modal,
  children,
  loading,
}) => {
  return (
    <Modal
      onRequestClose={() => setModal(!modal)}
      visible={modal}
      animationType="slide">
      <ScrollView
        contentContainerStyle={{flex: 1}}
        style={styles.contentContainer}>
        {loading ? <ActivityIndicator size="large" color="#fff" /> : children}
      </ScrollView>
    </Modal>
  )
}
export default ModalWithLoader

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    height: '100%',
    backgroundColor: '#212121',
  },
})
