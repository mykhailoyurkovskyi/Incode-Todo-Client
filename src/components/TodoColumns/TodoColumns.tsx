import { GridColDef, GridRowId, GridRowModes, GridRowModesModel } from '@mui/x-data-grid';
import CancelAction from '../actions/CancelAction/CancelAction';
import DeleteAction from '../actions/DeleteAction/DeleteAction';
import EditAction from '../actions/EditAction/EditAction';
import SaveAction from '../actions/SaveAction/SaveAction';
import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoStatus } from '../../types/TodoStatus';

interface ColumnActionProps {
  todosFromServer: Todo[];
  rowModesModel: GridRowModesModel;
  handleEditClick: (id: string) => void;
  handleDeleteClick: (boardId: string, title: string) => void;
  handleSaveClick: (id: string) => void;
  handleCancelClick: (id: string) => void;
}

export const getColumns = (
  todosFromServer: Todo[], 
  rowModesModel: GridRowModesModel, 
  handleSaveClick: (id: GridRowId) => () => void, 
  handleCancelClick: (id: GridRowId) => () => void, 
  handleEditClick: (id: GridRowId) => () => void, 
  handleDeleteClick: (id: number) => () => Promise<void>
    ) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 180, editable: false },
    { field: 'title', headerName: 'Title', width: 180, editable: true },
    {
      field: 'description',
      headerName: 'Description',
      type: 'string',
      width: 180,
      editable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      editable: true,
      type: 'singleSelect',
      valueOptions: Object.values(TodoStatus),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const todo = todosFromServer.find(todo => todo.id === id);
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        const todoTitle = todo!.title;

        if (isInEditMode) {
          return [
            <SaveAction id={id} handleSaveClick={handleSaveClick} />,
            <CancelAction id={id} handleCancelClick={handleCancelClick} />,
          ];
        }
    
        return [
          <EditAction id={id} handleEditClick={handleEditClick} />,
          <DeleteAction id={todo!.id} handleDeleteClick={handleDeleteClick} />,
        ];
      },
    },
  ];
  
  return columns;
};