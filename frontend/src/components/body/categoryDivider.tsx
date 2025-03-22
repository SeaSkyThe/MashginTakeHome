import React from 'react';
import { Divider } from '@mui/material';
import { Category } from '../../types/item';

interface CategoryDividerProps {
    selectedCategory: Category | null;
}

const CategoryDivider: React.FC<CategoryDividerProps> = ({ selectedCategory }) => {
    return (
        <Divider sx={{
            marginBottom: 6,
            fontWeight: 'bold',
            fontFamily: 'monospace',
            fontSize: '1.2rem',
            letterSpacing: '.15rem',
            color: "secondary.main",
            "&::before, &::after": { // Little trick to change divider line color
                borderColor: "secondary.main",
            },
        }}>
            {selectedCategory ? selectedCategory.name.toUpperCase() : ''}
        </Divider>
    );
};

export default CategoryDivider;
