/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios, { AxiosError } from 'axios';

export const editCell = async <T>(
  editUrl: string,
  tableName: string,
  columnNamesAndTypes: { name: string; type: string }[],
  editedCellValues: Record<string, unknown>, // Updated values for the row
  id: number // The ID of the row to update
) => {
  try {
    // Construct the SET clause for updating columns
    const setClause = columnNamesAndTypes
      .map((column) => {
        const columnName = column.name;
        const columnType = column.type;

        // Check if the editedCellValues has a value for the current column
        if (!editedCellValues[columnName]) {
          throw new Error(`No value for the ${columnName} column.`);
        }

        // Handle different data types based on the column type
        if (columnType === 'integer') {
          return `${columnName} = ${String(editedCellValues[columnName])}`;
        } else {
          return `${columnName} = '${String(editedCellValues[columnName])}'`;
        }
      })
      .join(', '); // Join the set clauses with commas

    await axios.post<T>(editUrl, {
      sqlCommand: `UPDATE ${tableName}
                    SET ${setClause}
                    WHERE id = ${id}`,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response && error.response.data) {
        if (error.response.data.error) {
          const errorMessage = error.response.data.error; // Get the error message from the response data
          throw new Error(errorMessage);
        }
      } else {
        throw new Error('Network error. Please check your internet connection.');
      }
    } else {
      throw new Error('Unknown error. Please try again later.');
    }
  }
};

export const deleteCell = async (deleteUrl: string, tableName: string, id: number) => {
  try {
    await axios.post(deleteUrl, { sqlCommand: `DELETE FROM ${tableName} WHERE id = '${id}'` });
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response && error.response.data) {
        if (error.response.data.error) {
          const errorMessage = error.response.data.error; // Get the error message from the response data
          throw new Error(errorMessage);
        }
      }
    } else {
      throw new Error('Unknown error. Please try again later.');
    }
  }
};

export const addCell = async <T>(
  addUrl: string,
  columnNamesAndTypes: { name: string; type: string }[],
  tableName: string,
  cell: Record<string, unknown>
) => {
  try {
    // Extract column names and values from the cell object
    const columns = columnNamesAndTypes.map((column) => {
      return column.name;
    });
    const values = columnNamesAndTypes.map((column) => {
      const columnName = column.name;
      const columnType = column.type;
      // Check if the cell has a value for the current column
      if (!cell[columnName]) {
        throw new Error(`No value for the ${columnName} column.`);
      }

      // Handle different data types based on the column type
      if (columnType === 'integer') {
        return cell[columnName];
      } else {
        return `'${String(cell[columnName])}'`;
      }
    });

    // Remove null values from the values array (if any)
    const filteredValues = values.filter((value) => {
      return value !== null;
    });

    await axios.post<T>(addUrl, {
      sqlCommand: `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${filteredValues.join(', ')})`,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response && error.response.data) {
        if (error.response.data.error) {
          const errorMessage = error.response.data.error; // Get the error message from the response data
          throw new Error(errorMessage);
        }
      } else {
        console.error(error);
        throw new Error('Network error. Please check your internet connection.');
      }
    } else {
      console.error(error);
      throw new Error('Unknown error. Please try again later.');
    }
  }
};

export const sendSQLCommand = async (commandUrl: string, command: string) => {
  try {
    await axios.post(commandUrl, { sqlCommand: command });
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response && error.response.data) {
        if (error.response.data.error) {
          const errorMessage = error.response.data.error; // Get the error message from the response data
          throw new Error(errorMessage);
        }
      } else {
        throw new Error('Network error. Please check your internet connection.');
      }
    } else {
      throw new Error('Unknown error. Please try again later.');
    }
  }
};
