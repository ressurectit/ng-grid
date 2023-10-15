export * from './components';
export * from './directives';
export * from './interfaces';
export * from './misc/enums';
export * from './misc/providers';
export * from './misc/tokens';
export * from './misc/types';
export * from './misc/utils';
export * from './modules';
export * from './pipes';
export * from './plugins';

//TODO: use signals
//TODO: add ordering plugin
//TODO: use new syntax
//TODO: new matrix grid
//TODO: directive for attaching external plugins, new type that allows obtaining or using export as ref
//TODO: rework all pagings, styles and use it as component itself, paging initialization rework
//TODO: styles in datetime style
//TODO: items per page overwrite, not merge
//TODO: maybe rewrite GridPluginInstances to more "specific" types
//TODO: use inject in base classes also in plugins
//TODO: maybe unify id and name and use only one (ID)??
//TODO: maybe add ordering to permanent grid initializer
//TODO: ordering handle metadata changes
//TODO: make renderer for orderable.directive that will be configurable
//TODO: add support for disable ordering of columns in metadata selector
//TODO: create way how to change default templates for matrix content renderer