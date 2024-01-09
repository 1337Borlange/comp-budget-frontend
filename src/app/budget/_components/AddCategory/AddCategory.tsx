'use client';

import { useEffect, useState } from 'react';

import Box from '@/components/Box';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Divider from '@/components/Divider';
import Modal from '@/components/Modal';
import TextField from '@/components/Textfield';
import { InlineStack } from '@/components/InlineStack';
import { Label } from '@/components/FormControl/Label';

import { saveCategory } from './actions';
import { CategoryUnit } from '@/lib/types';
import Radiobutton from '@/components/Radiobutton';
import toast from 'react-hot-toast';

const AddCategory = () => {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [isHardware, setIsHardware] = useState(false);

  async function clientAction(formData: FormData) {
    const result = await saveCategory(formData);

    console.log(result);

    if (result?.status === 200) {
      toast.success(`Category added succesfully!`);
    } else {
      console.error(result?.message ?? 'Something went wrong.');
      toast.error(result?.message ?? 'Something went wrong.');
    }

    setShowAddCategory(false);
  }

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
        <form action={(formData: FormData) => clientAction(formData)}>
          <TextField label="Category name" name="name" fullWidth />
          <Divider spacing="s" color="transparent" />
          <Box bottomSpacing="xs">
            <Label>Category belongs to type *</Label>
          </Box>
          <InlineStack spacing="l">
            <Radiobutton
              id="money-cat"
              name="unit"
              label={CategoryUnit[0]}
              value={String(CategoryUnit.Monetary)}
            />
            <Radiobutton
              id="time-cat"
              name="unit"
              label={CategoryUnit[1]}
              value={String(CategoryUnit.Time)}
            />
          </InlineStack>
          <Divider spacing="m" />
          <InlineStack spacing="l">
            <Checkbox
              id="is-hardware"
              name="isHardware"
              label="Is hardware"
              onChange={() => setIsHardware(!isHardware)}
              value={String(isHardware)}
            />
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
