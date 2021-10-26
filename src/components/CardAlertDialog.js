import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogFooter,
  Button,
} from '@chakra-ui/react';

const CardAlertDialog = ({
  currentSearchType,
  isAlertDialogOpen,
  onAlertDialogClose,
  cancelRef,
  handleRemoveClick,
}) => {
  return (
    <AlertDialog
      isOpen={isAlertDialogOpen}
      onClose={onAlertDialogClose}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete item
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure to delete this{' '}
            {currentSearchType === 'Movies' ? 'movie' : 'tv series'} from your{' '}
            {currentSearchType === 'Movies' ? 'movies' : 'tv'} list?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button colorScheme="red" onClick={handleRemoveClick} mr={3}>
              Delete
            </Button>
            <Button ref={cancelRef} onClick={onAlertDialogClose}>
              Cancel
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default CardAlertDialog;
