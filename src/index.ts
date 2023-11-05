export * from './components';
export * from './directives';
export * from './interfaces';
export * from './misc/enums';
export * from './misc/gridPluginInstancesDef';
export * from './misc/providers';
export * from './misc/tokens';
export * from './misc/types';
export * from './misc/utils';
export * from './modules';
export * from './pipes';
export * from './plugins';

//TODO: use signals
//TODO: use new syntax
//TODO: new matrix grid
//TODO: directive for attaching external plugins, new type that allows obtaining or using export as ref
//TODO: rework all pagings, styles and use it as component itself, paging initialization rework
//TODO: styles in datetime style
//TODO: items per page overwrite, not merge
//TODO: use inject in base classes also in plugins
//TODO: maybe unify id and name and use only one (ID)??
//TODO: maybe add ordering to permanent grid initializer
//TODO: ordering handle metadata changes
//TODO: add support for disable ordering of columns in metadata selector
//TODO: all base plugin interface implements base TOptions extends pluginOptions => GridPlugin<TOptions>
//TODO: make providers functions for tokens
//TODO: metadata selector bug, selection change removes data
//TODO: move here button for metadata selection, or create directive, even better
//TODO: not working drag n drop