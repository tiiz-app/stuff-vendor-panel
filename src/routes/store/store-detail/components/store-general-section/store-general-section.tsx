import {
  Avatar,
  Container,
  Heading,
  Text,
} from '@medusajs/ui';
import { useTranslation } from 'react-i18next';

import { StoreVendor } from '../../../../../types/user';
import { ActionMenu } from '../../../../../components/common/action-menu';
import { Pencil } from '@medusajs/icons';

export const StoreGeneralSection = ({
  seller,
}: {
  seller: StoreVendor;
}) => {
  const { t } = useTranslation();

  return (
    <Container className='divide-y p-0'>
      <div className='flex items-center justify-between px-6 py-4'>
        <div>
          <Heading>{t('store.domain')}</Heading>
        </div>
        <ActionMenu
          groups={[
            {
              actions: [
                {
                  icon: <Pencil />,
                  label: 'Edit',
                  to: 'edit',
                },
              ],
            },
          ]}
        />
      </div>
      <div className='text-ui-fg-subtle grid grid-cols-2 px-6 py-4'>
        <Text size='small' leading='compact' weight='plus'>
          Image
        </Text>
        <div className='w-6 h-6'>
          <Avatar
            size='small'
            variant='rounded'
            src={seller.photo || '/logo.svg'}
            fallback={'/logo.svg'}
          />
        </div>
      </div>
      <div className='text-ui-fg-subtle grid grid-cols-2 px-6 py-4'>
        <Text size='small' leading='compact' weight='plus'>
          {t('fields.name')}
        </Text>
        <Text size='small' leading='compact'>
          {seller.name}
        </Text>
      </div>
      <div className='text-ui-fg-subtle grid grid-cols-2 px-6 py-4'>
        <Text size='small' leading='compact' weight='plus'>
          {t('fields.email')}
        </Text>
        <Text size='small' leading='compact'>
          {seller.email}
        </Text>
      </div>
      <div className='text-ui-fg-subtle grid grid-cols-2 px-6 py-4'>
        <Text size='small' leading='compact' weight='plus'>
          {t('fields.phone')}
        </Text>
        <Text size='small' leading='compact'>
          {seller.phone}
        </Text>
      </div>
      <div className='text-ui-fg-subtle grid grid-cols-2 px-6 py-4'>
        <Text size='small' leading='compact' weight='plus'>
          Description
        </Text>
        <Text size='small' leading='compact'>
          {seller.description || '-'}
        </Text>
      </div>
    </Container>
  );
};
