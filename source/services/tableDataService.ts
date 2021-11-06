import { TableData, ColData, SlotData } from './../model/TableData';
import { getConnection, getRepository, createConnection } from 'typeorm';
import { Timetable } from '../entity/Timetable';
import logging from '../config/logging';
import { Rowtable } from '../entity/Rowtable';
import { Coltable } from '../entity/Coltable';
import { Slottable } from '../entity/Slottable';
import { StaticData } from '../entity/StaticData';

const NAMESPACE = 'Timetable Service';

//TYPE ORM LOGGERS
let orm_error_flag: boolean = false;
const orm_error_log = (error: any) => {
    logging.error(NAMESPACE, error.message, error);
    orm_error_flag = true;
};
const check_orm_errors = () => {
    let val = orm_error_flag;
    orm_error_flag = false;

    return val;
};

const syncStaticAndDynamic = async () => {
    let staticData = await getRepository(StaticData).find();

    for (let i = 0; i < staticData.length; i++) {
        let backupData = JSON.parse(String(staticData[i].data));

        await saveTableData(backupData);
    }
};

const saveStaticTableData = async (data: TableData | undefined): Promise<string | undefined> => {
    if (data == undefined || data.id == undefined) {
        logging.error(NAMESPACE, 'Static save data invalid(requires id)');
        return undefined;
    }

    let backup = new StaticData();
    backup.id = data.id;
    backup.data = JSON.stringify(data);

    await getRepository(StaticData).save(backup);

    return saveTableData(data);
};

const saveTableData = async (data: TableData | undefined): Promise<string | undefined> => {
    if (data == undefined) {
        logging.error(NAMESPACE, 'Save table data not provided', data);
        return undefined;
    }

    let newTimetable = new Timetable();
    newTimetable.id = data.id;
    newTimetable.name = data.name;
    newTimetable.numrows = data.numrows;
    newTimetable.numcols = data.numcols;

    await getRepository(Timetable).save(newTimetable).catch(orm_error_log);
    if (check_orm_errors()) {
        logging.error(NAMESPACE, 'Unable to save data to database', data);
        return undefined;
    }

    const entryId = newTimetable.id;

    //TODO : ADD error checking
    //TODO : Make this transactional

    //Delete rows from before
    await getRepository(Rowtable).delete({ timetable: newTimetable });
    //Save new rows
    for (let i = 0; i < data.rows.length; i++) {
        let rowData = new Rowtable();
        rowData.name = data.rows[i];
        rowData.timetable = newTimetable;

        await getRepository(Rowtable).save(rowData);
    }

    //Delete cols from before
    await getRepository(Coltable).delete({ timetable: newTimetable });
    //Save the columns
    for (let i = 0; i < data.cols.length; i++) {
        let colData = new Coltable();
        colData.start = data.cols[i].start;
        colData.end = data.cols[i].end;
        colData.timetable = newTimetable;

        await getRepository(Coltable).save(colData);
    }

    //Delete slots from before
    await getRepository(Slottable).delete({ timetable: newTimetable });
    //Save new slots
    for (let i = 0; i < data.slots.length; i++) {
        let slotData = new Slottable();
        slotData.title = data.slots[i].title;
        slotData.row = data.slots[i].row;
        slotData.col = data.slots[i].col;
        slotData.timetable = newTimetable;

        await getRepository(Slottable).save(slotData);
    }

    return entryId;
};
const getTableDataByID = async (searchId: string | undefined): Promise<TableData | undefined> => {
    if (searchId == undefined) {
        logging.error(NAMESPACE, 'Get table data id type mismatch', searchId);
        return undefined;
    }

    let timetableData = await getRepository(Timetable).findOne({ where: { id: searchId } });
    if (timetableData == undefined) {
        logging.error(NAMESPACE, 'Get table data id mismatch', searchId);
        return undefined;
    }

    let rowData = await getRepository(Rowtable).find({ where: { timetable: timetableData } });
    let colData = await getRepository(Coltable).find({ where: { timetable: timetableData } });
    let slotData = await getRepository(Slottable).find({ where: { timetable: timetableData } });
    //FINAL DATA
    let parsedData: TableData = {
        id: timetableData.id,
        name: timetableData.name,
        numrows: timetableData.numrows,
        numcols: timetableData.numcols,
        rows: getRowNames(rowData),
        cols: getColArray(colData),
        slots: getSlotArray(slotData)
    };

    return parsedData;
};

const getRowNames = (rowData: Rowtable[]): string[] => {
    let arr = [] as string[];
    for (let i = 0; i < rowData.length; i++) {
        arr.push(rowData[i].name);
    }

    return arr;
};

const getColArray = (colData: Coltable[]): ColData[] => {
    let arr = [] as ColData[];
    for (let i = 0; i < colData.length; i++) {
        let obj: ColData = {
            start: colData[i].start,
            end: colData[i].end
        };

        arr.push(obj);
    }
    return arr;
};

const getSlotArray = (slotData: Slottable[]): SlotData[] => {
    let arr = [] as SlotData[];
    for (let i = 0; i < slotData.length; i++) {
        let obj: SlotData = {
            title: slotData[i].title,
            row: slotData[i].row,
            col: slotData[i].col
        };

        arr.push(obj);
    }
    return arr;
};

const getStaticData = async (searchId: string | undefined): Promise<StaticData | undefined> => {
    if (searchId == undefined) {
        logging.error(NAMESPACE, 'Get static data id type mismatch', searchId);
        return undefined;
    }

    let timetableData = await getRepository(StaticData).findOne({ where: { id: searchId } });
    if (timetableData == undefined) {
        logging.error(NAMESPACE, 'Get statuc data id mismatch', searchId);
        return undefined;
    }

    return timetableData;
};

export default { saveTableData, getTableDataByID, saveStaticTableData, syncStaticAndDynamic, getStaticData };
