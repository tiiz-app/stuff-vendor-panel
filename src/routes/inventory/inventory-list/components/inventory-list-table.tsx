import { InventoryTypes } from '@medusajs/types';
import { Container, Heading, Text } from '@medusajs/ui';

import { RowSelectionState } from '@tanstack/react-table';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { _DataTable } from '../../../../components/table/data-table';
import { useInventoryItems } from '../../../../hooks/api/inventory';
import { useDataTable } from '../../../../hooks/use-data-table';
import { INVENTORY_ITEM_IDS_KEY } from '../../common/constants';
import { useInventoryTableColumns } from './use-inventory-table-columns';
import { useInventoryTableQuery } from './use-inventory-table-query';

const PAGE_SIZE = 20;

export const InventoryListTable = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [selection, setSelection] =
    useState<RowSelectionState>({});

  const { raw, searchParams } = useInventoryTableQuery({
    pageSize: PAGE_SIZE,
  });

  const {
    inventory_items,
    count,
    isPending: isLoading,
    isError,
    error,
  } = useInventoryItems({
    limit: PAGE_SIZE,
    offset: searchParams?.offset,
    fields: 'id,title,sku,*location_levels',
  });

  const columns = useInventoryTableColumns();

  const { table } = useDataTable({
    data: (inventory_items ??
      []) as InventoryTypes.InventoryItemDTO[],
    columns,
    count,
    enablePagination: true,
    getRowId: (row) => row.id,
    pageSize: PAGE_SIZE,
    enableRowSelection: true,
    rowSelection: {
      state: selection,
      updater: setSelection,
    },
  });

  if (isError) {
    throw error;
  }

  return (
    <Container className='divide-y p-0'>
      <div className='flex items-center justify-between px-6 py-4'>
        <div>
          <Heading>{t('inventory.domain')}</Heading>
          <Text className='text-ui-fg-subtle' size='small'>
            {t('inventory.subtitle')}
          </Text>
        </div>
      </div>
      <_DataTable
        table={table}
        columns={columns}
        pageSize={PAGE_SIZE}
        count={count}
        isLoading={isLoading}
        pagination
        queryObject={raw}
        navigateTo={(row) => `${row.id}`}
        commands={[
          {
            action: async (selection) => {
              navigate(
                `stock?${INVENTORY_ITEM_IDS_KEY}=${Object.keys(
                  selection
                ).join(',')}`
              );
            },
            label: t('inventory.stock.action'),
            shortcut: 'i',
          },
        ]}
      />
    </Container>
  );
};
