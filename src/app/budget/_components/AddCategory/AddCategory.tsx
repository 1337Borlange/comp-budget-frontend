'use client';

import { useState } from 'react';

import Box from '@/components/Box';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Divider from '@/components/Divider';
import Modal from '@/components/Modal';
import TextField from '@/components/Textfield';
import { InlineStack } from '@/components/InlineStack';
import { Label } from '@/components/FormControl/Label';

import { saveCategory } from './actions';

const AddCategory = () => {
  const [showAddCategory, setShowAddCategory] = useState(false);
  return (
    <>
      <Button priority="outline" onClick={() => setShowAddCategory(true)}>
        Add new category
      </Button>
      <Modal
        id="add-category-modal"
        blur
        visible={showAddCategory}
        onClose={() => setShowAddCategory(false)}>
        <h2>Add a new category</h2>
        <Divider spacing="l" />
        <form action={saveCategory}>
          <TextField label="Category name" name="categoryName" fullWidth />
          <Divider spacing="s" color="transparent" />
          <Box bottomSpacing="xs">
            <Label>Category belongs to type *</Label>
          </Box>
          <InlineStack spacing="l">
            <Checkbox id="time-cat" name="categoryType" label="Time" value="time" />
            <Checkbox id="money-cat" name="categoryType" label="Money" value="money" />
          </InlineStack>
          <Divider spacing="l" />
          <Box alignItems="flex-end">
            <Button type="submit">Add category</Button>
          </Box>
        </form>
      </Modal>
    </>
  );
};

export default AddCategory;
