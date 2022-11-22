import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

const Components = {
  ItalicInput: componentLoader.add('ItalicInput', './italic-input'),
};

export { componentLoader, Components };
