# TableGroup

https://github.com/angular/components/issues/10660

https://stackblitz.com/edit/angular-material-table-row-grouping

https://www.ag-grid.com/angular-getting-started/

https://www.jqwidgets.com/angular-components-documentation/documentation/angular-cli-with-jqwidgets-ng/index.htm

The documentation for Ag Grid and JQWidgets does not mention the possibility for expanded rows.

## Tasks to implement row group on current table without pagination:

1. Create new row, collumn and cell templates for the group headers (3h);
2. Hide pagination options when rows are groupped (3h)
3. Group the data in a tree like structure separating what is going to be rendered in a header template and what is not (8h)
4. Hide and show inner rows when a group header row is clicked (6h)
5. Hide grouped columns from the table (4h)

## Tasks to implement row group on current table with pagination

1. Do all steps above
2. Create separate calls to the backend to get groups paginated (4h)
3. On every group expantion make server call to bring inner groups or rows (8h)
4. Do regular pagination on inner groups or rows (6h)
5. Do infinite scrolling on inner groups or rows with server pagination (16h)
