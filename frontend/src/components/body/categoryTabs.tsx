import React from 'react';
import { Tab, Tabs } from '@mui/material';
import { Category } from '../../types/api';

interface CategoryTabsProps {
    categories: Category[];
    selectedCategory: Category | null;
    setSelectedCategory: (category: Category) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, selectedCategory, setSelectedCategory }) => {
    return (
        <Tabs value={selectedCategory?.id}
            onChange={(_e, newCategoryId) => {
                const newCategory = categories.find(cat => cat.id === newCategoryId);
                if (newCategory) setSelectedCategory(newCategory);
            }}
            textColor="secondary"
            indicatorColor="secondary"
            centered
            sx={{
                marginTop: 9,
                marginBottom: 5,
                flexWrap: { xs: 'wrap', sm: 'nowrap' }, // It will "break" line on small screens if needed
                justifyContent: { xs: 'center', sm: 'flex-start' },
            }}

        >
            {categories.map((category) => (
                <Tab key={category.id} value={category.id} label={category.name}
                    sx={{
                        fontWeight: 'bold',
                        fontFamily: 'monospace',
                        fontSize: '1.0rem',
                        letterSpacing: '.15rem',
                        color: 'black',
                        '&.Mui-selected': {
                            color: 'secondary.main',
                        },
                        '&:hover': {
                            color: 'secondary.main',
                            backgroundColor: 'transparent',
                        },
                        margin: { xs: '0 0', sm: '0 25px' },
                        borderRadius: '10px',
                    }}
                />
            ))}
        </Tabs>
    );
};

export default CategoryTabs;
