'use client';

import { User } from '@/lib/types';
import Divider from '@/components/Divider';
import Grid from '@/components/Grid';
import Column from '@/components/Column';
import TextField from '@/components/Textfield';
import Box from '@/components/Box';
import Button from '@/components/Button';
import Select from '@/components/Select';
import ComboBox from '@/components/ComboBox';
import { offices, shirtSizes } from '@/lib/settings';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { useState } from 'react';
import { DeleteIcon } from '@/components/Icons/DeleteIcon';
import { deleteUser, updateUser } from '../_actions/user';
import { getErrorMessage } from '@/lib/helpers';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type UpdateUserProps = {
  user?: User;
  allUsers: User[];
};

/*
 * Employee number
 * departement number
 * 6 första siffrorna i personnumret
 * telefonnummer
 * adress
 * tröjstorlek
 * allergier
 * manager
 * kontor man tillhör

*/

export const UpdateUser = ({ user, allUsers }: UpdateUserProps) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const router = useRouter();
  async function clientSaveAction(formData: FormData) {
    const result = await updateUser(formData);

    if (result?.error) {
      const msg = getErrorMessage(result.error);
      toast.error(msg);
    } else {
      toast.success(`User has been updated!´}`);
    }
  }

  async function clientDeleteAction(formData: FormData) {
    const result = await deleteUser(formData);

    if (result?.error) {
      const msg = getErrorMessage(result.error);
      toast.error(msg);
    } else {
      toast.success(`User has been deleted! Redirecting in 2 seconds...´}`);
      setTimeout(() => {
        router.push('/admin');
      }, 2000);
    }
  }
  return (
    <div>
      <Grid spacing="m">
        <Column lg="8" md="8" sm="8" xs="12">
          <h2>Update user</h2>
        </Column>
        <Column lg="4" md="4" sm="4" xs="12">
          <Button
            priority="critical"
            onClick={() => setShowConfirmDelete(true)}
            iconLeft
          >
            <DeleteIcon /> Delete user
          </Button>
        </Column>
      </Grid>
      <ConfirmDialog
        id="confirm-delete-user-dialog"
        visible={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        // onConfirm={() => {
        //   if (expenseToDelete?.id) {
        //     deleteExpense(expenseToDelete?.id);
        //   }
        //   setShowConfirmDelete(false);
        // }}
        width="30rem"
        action={clientDeleteAction}
        title="Delete user"
      >
        <p>
          <strong>This action is permanent.</strong>
        </p>
        <Divider spacing="xs" />
        <p>Are you sure you want to delete this user and all related data?</p>
        <input type="hidden" name="userId" id="userId" value={user?.id} />
      </ConfirmDialog>
      <Divider spacing="m" color="transparent" />

      <>
        <form action={clientSaveAction}>
          <input type="hidden" name="userId" value={user?.id} />
          <input type="hidden" name="name" value={user?.name} />

          <Grid spacing="l">
            <Column lg="6" md="6" sm="6" xs="12">
              <TextField
                label="Employee number"
                name="employeeNumber"
                id="employeeNumber"
                defaultValue={user?.employeeNumber}
              />
            </Column>
            <Column lg="6" md="6" sm="6" xs="12">
              <TextField
                label="Department number"
                name="departmentNumber"
                id="departmentNumber"
                defaultValue={user?.departmentNumber}
              />
            </Column>
          </Grid>
          <Divider spacing="s" />
          <Grid spacing="l">
            <Column lg="6" md="6" sm="6" xs="12">
              <TextField
                label="Personal number (six digits, eg. XXXXXX)"
                name="personalNumber"
                id="personalNumber"
                type="number"
                defaultValue={user?.personalNumber}
              />
            </Column>
            <Column lg="6" md="6" sm="6" xs="12">
              <TextField
                label="Phone number"
                name="phoneNumber"
                id="phoneNumber"
                type="tel"
                defaultValue={user?.phoneNumber}
              />
            </Column>
          </Grid>
          <Divider spacing="s" />
          <Grid spacing="l">
            <Column lg="6" md="6" sm="6" xs="12">
              <TextField
                label="Address"
                name="address"
                id="address"
                defaultValue={user?.address}
              />
            </Column>
            <Column lg="6" md="6" sm="6" xs="12">
              <TextField
                label="Email"
                name="email"
                id="email"
                type="email"
                defaultValue={user?.email}
              />
            </Column>
          </Grid>
          <Divider spacing="s" />
          <Grid spacing="l">
            <Column lg="6" md="6" sm="6" xs="12">
              <Select
                label="Shirt size"
                name="shirtSize"
                defaultValue={user?.shirtSize}
              >
                {shirtSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </Select>
            </Column>
            <Column lg="6" md="6" sm="6" xs="12">
              <TextField
                label="Allergies"
                name="allergies"
                id="allergies"
                defaultValue={user?.allergies}
              />
            </Column>
          </Grid>
          <Divider spacing="s" />
          <Grid spacing="l">
            <Column lg="6" md="6" sm="6" xs="12">
              <Select label="Office" name="office" defaultValue={user?.office}>
                {offices.map((office) => (
                  <option key={office} value={office}>
                    {office}
                  </option>
                ))}
              </Select>
            </Column>
            <Column lg="6" md="6" sm="6" xs="12">
              {/* <TextField label="Manager" name="manager" id="manager" /> */}
              <ComboBox
                fullWidth
                label="Select manager"
                name="manager"
                defaultValue={user?.manager}
                data={allUsers.map((user) => ({
                  id: user.id,
                  title: user.name,
                }))}
              />
            </Column>
          </Grid>
          <Box topSpacing="l" alignItems="flex-end">
            <Button type="submit">Update user</Button>
          </Box>
        </form>
      </>
    </div>
  );
};
