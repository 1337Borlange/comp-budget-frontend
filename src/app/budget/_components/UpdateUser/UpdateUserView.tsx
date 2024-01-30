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
import { useEffect, useMemo, useState } from 'react';
import { DeleteIcon } from '@/components/Icons/DeleteIcon';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import ToggleSwitch from '@/components/ToggleSwitch';
import { deleteUser, updateUser } from './actions';

type UpdateUserProps = {
  me: User | undefined;
  users: User[] | undefined;
  selectedUserId: string;
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

export const UpdateUserView = ({ me, users, selectedUserId }: UpdateUserProps) => {
  const selectedUser = useMemo(() => {
    return users?.find((user) => String(user.id) === selectedUserId);
  }, [selectedUserId, users]);

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const router = useRouter();

  const deleteIsHidden = selectedUserId !== String(me?.id);

  async function clientSaveAction(formData: FormData) {
    const id = String(formData.get('userId'));

    const updatedUser: User = {
      id,
      name: String(formData.get('name')),
      employeeNumber: String(formData.get('employeeNumber')),
      departmentNumber: String(formData.get('departmentNumber')),
      personalNumber: String(formData.get('personalNumber')),
      phoneNumber: String(formData.get('phoneNumber')),
      address: String(formData.get('address')),
      email: String(formData.get('email')),
      shirtSize: String(formData.get('shirtSize')),
      allergies: String(formData.get('allergies')),
      office: String(formData.get('office')),
      manager: String(formData.get('manager')),
      isAdmin: formData.get('isAdmin') === 'on' ? true : false,
      isManager: formData.get('isManager') === 'on' ? true : false,
    };

    const result = await updateUser(updatedUser);

    if (result?.status === 200) {
      toast.success(`User has been updated!`);
    } else {
      toast.error('Something went wrong.');
    }
  }

  async function clientDeleteAction(formData: FormData) {
    const result = await deleteUser(formData);

    if (result?.status === 200) {
      toast.success(`User has been deleted! Redirecting in 2 seconds...´}`);
      setTimeout(() => {
        router.push('/admin');
      }, 2000);
    } else {
      toast.error('Something went wrong.');
    }
  }

  return (
    <div>
      <ConfirmDialog
        id="confirm-delete-user-dialog"
        visible={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        width="30rem"
        action={clientDeleteAction}
        title="Delete user">
        <p>
          <strong>This action is permanent.</strong>
        </p>
        <Divider spacing="xs" />
        <p>Are you sure you want to delete this user and all related data?</p>
        <input type="hidden" name="userId" id="userId" value={selectedUser?.id} />
      </ConfirmDialog>
      <Divider spacing="m" color="transparent" />
      <form action={(formData: FormData) => clientSaveAction(formData)}>
        <input type="hidden" name="userId" value={selectedUser?.id} />
        <Grid spacing="l">
          <Column xs="12">
            <TextField
              label="Name"
              name="name"
              id="name"
              key={`name-${selectedUser?.id}`}
              defaultValue={selectedUser?.name ?? ''}
            />
          </Column>
          <Column lg="6" md="6" sm="6" xs="12">
            <TextField
              label="Employee number"
              name="employeeNumber"
              id="employeeNumber"
              key={`employeenr-${selectedUser?.id}`}
              defaultValue={selectedUser?.employeeNumber ?? ''}
            />
          </Column>
          <Column lg="6" md="6" sm="6" xs="12">
            <TextField
              label="Department number"
              name="departmentNumber"
              id="departmentNumber"
              key={`departmentnr-${selectedUser?.id}`}
              defaultValue={selectedUser?.departmentNumber ?? ''}
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
              key={`personalnr-${selectedUser?.id}`}
              defaultValue={selectedUser?.personalNumber ?? ''}
            />
          </Column>
          <Column lg="6" md="6" sm="6" xs="12">
            <TextField
              label="Phone number"
              name="phoneNumber"
              id="phoneNumber"
              key={`phonenr-${selectedUser?.id}`}
              type="tel"
              defaultValue={selectedUser?.phoneNumber ?? ''}
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
              key={`address-${selectedUser?.id}`}
              defaultValue={selectedUser?.address ?? ''}
            />
          </Column>
          <Column lg="6" md="6" sm="6" xs="12">
            <TextField
              label="Email"
              name="email"
              id="email"
              type="email"
              key={`email-${selectedUser?.id}`}
              defaultValue={selectedUser?.email ?? ''}
            />
          </Column>
        </Grid>
        <Divider spacing="s" />
        <Grid spacing="l">
          <Column lg="6" md="6" sm="6" xs="12">
            <Select
              label="Shirt size"
              name="shirtSize"
              key={`shirtsize-${selectedUser?.id}`}
              defaultValue={selectedUser?.shirtSize}>
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
              key={`allergies-${selectedUser?.id}`}
              defaultValue={selectedUser?.allergies ?? ''}
            />
          </Column>
        </Grid>
        <Divider spacing="s" />
        <Grid spacing="l">
          <Column lg="6" md="6" sm="6" xs="12">
            <Select
              label="Office"
              name="office"
              key={`office-${selectedUser?.id}`}
              defaultValue={selectedUser?.office}>
              {offices.map((office) => (
                <option key={office} value={office}>
                  {office}
                </option>
              ))}
            </Select>
          </Column>
          <Column lg="6" md="6" sm="6" xs="12">
            <ComboBox
              fullWidth
              label="Select manager"
              name="manager"
              defaultValue={selectedUser?.manager}
              key={`manager-${selectedUser?.id}`}
              data={
                users?.map((user) => ({
                  id: user.id,
                  title: user.name,
                })) ?? []
              }
            />
          </Column>
          <Column lg="6" md="6" sm="6" xs="12">
            <ToggleSwitch
              label="Is manager"
              id="is-manager"
              name="isManager"
              defaultChecked={selectedUser?.isManager ?? false}
            />
          </Column>
          <Column lg="6" md="6" sm="6" xs="12">
            <ToggleSwitch
              label="Is admin"
              id="is-admin"
              name="isAdmin"
              defaultChecked={selectedUser?.isAdmin ?? false}
            />
          </Column>
        </Grid>
        <Box topSpacing="l" alignItems="flex-end">
          <Button type="submit">Update user</Button>
        </Box>
      </form>
      {deleteIsHidden && (
        <>
          <Divider spacing="m" color="var(--colors-silver)" />
          <Grid spacing="m">
            <Column lg="4" md="4" sm="4" xs="12">
              <Button priority="critical" onClick={() => setShowConfirmDelete(true)} iconLeft>
                <DeleteIcon /> Delete user
              </Button>
            </Column>
          </Grid>
        </>
      )}
    </div>
  );
};
