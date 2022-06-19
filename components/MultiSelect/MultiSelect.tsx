import React, { useState } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuGroup,
  MenuOptionGroup,
  MenuItemOption,
  Button,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const MultiSelectMenu: React.FC<MultiSelectMenuProps> = ({
  label,
  options,
  value,
  onChange,
  multi,
}) => {
  return (
    <Menu closeOnSelect={!multi}>
      {({ onClose }) => (
        <>
          <MenuButton
            /* eslint-disable @typescript-eslint/ban-ts-comment */
            // @ts-ignore <MenuButton> does have a 'type' prop because it is just a button. This is to make sure clicking this doesn't submit any forms.
            type="button"
            color="tomato.500"
            borderRadius="0"
            borderColor="tomato.500"
            // bgColor="cheese.100"
            borderWidth={1}
            _hover={
              {
                //   bgColor: 'cheese.100',
              }
            }
            _focus={{
              //   bgColor: 'cheese.100',
              outline: 'none',
            }}
            _active={
              {
                //   bgColor: 'cheese.100',
              }
            }
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            {`${label}${multi && value.length > 0 ? ` (${value.length})` : ''}`}
          </MenuButton>
          <MenuList
            maxHeight={'300px'}
            overflowY="auto"
            color="tomato.500"
            bgColor="white"
            borderRadius="0"
            borderColor="tomato.500"
            borderWidth={1}
          >
            {multi ? (
              <>
                <MenuGroup title={undefined}>
                  <MenuItem
                    onClick={() => {
                      onChange?.([]);
                      onClose();
                    }}
                    _hover={{ bgColor: 'gray.background' }}
                  >
                    Clear all
                  </MenuItem>
                </MenuGroup>
                <MenuDivider />
              </>
            ) : null}
            <MenuOptionGroup
              title={undefined}
              defaultValue={value}
              value={value}
              type={multi ? 'checkbox' : 'radio'}
              onChange={(values: string[]) => {
                onChange?.(values);
              }}
            >
              {options.map((option, index) => {
                return (
                  <MenuItemOption
                    _hover={{ bgColor: 'gray.background' }}
                    key={`multiselect-menu-${option.value}-${index}`}
                    /* eslint-disable @typescript-eslint/ban-ts-comment */
                    // @ts-ignore <MenuItemOption> does have a 'type' prop because it is just a button. This is to make sure clicking this doesn't submit any forms.
                    type="button"
                    value={option.value}
                  >
                    {option.label}
                  </MenuItemOption>
                );
              })}
            </MenuOptionGroup>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

MultiSelectMenu.displayName = 'MultiSelectMenu';

export type MultiSelectMenuProps = {
  label: string;
  options: { value: string; label: string }[];
  value?: string[] | string;
  multi?: boolean;
  onChange?: (selectedValues: string[] | string) => void;
};

export default MultiSelectMenu;
