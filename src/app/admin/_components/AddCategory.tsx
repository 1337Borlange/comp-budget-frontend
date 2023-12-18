'use client';

import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { useState } from 'react';
import Divider from '@/components/Divider';
import TextField from '@/components/Textfield';
import Box from '@/components/Box';
import { Label } from '@/components/FormControl/Label';
import { InlineStack } from '@/components/InlineStack';
import Checkbox from '@/components/Checkbox';
import { saveCategory } from '../_actions/category';

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
