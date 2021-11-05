import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import { TableData } from '../model/TableData';
import timetableService from '../services/tableDataService';

const NAMESPACE = 'Timetable Controller';

const saveTimetableDataStatic = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Timetable controller save table data STATIC route called.');
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        logging.error(NAMESPACE, 'Route save STATIC called without body');
        return res.status(400).json({
            message: 'Request without body'
        });
    } else if (req.body.timetable == undefined) {
        logging.error(NAMESPACE, 'Route save STATIC called with invalid request body');
        return res.status(400).json({
            message: 'Request with invalid body'
        });
    }

    const data: TableData | undefined = req.body.timetable;

    const success = await timetableService.saveStaticTableData(data);

    if (success != undefined && data != undefined) {
        data.id = success;
        return res.status(200).json({
            message: 'Save STATIC Route success',
            dataSaved: data
        });
    } else {
        return res.status(500).json({
            message: 'Save STATIC failed',
            failData: data
        });
    }
};

const saveTimetableDataDynamic = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Timetable controller save table data route called.');
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        logging.error(NAMESPACE, 'Route save DYNAMIC called without body');
        return res.status(400).json({
            message: 'Request without body'
        });
    } else if (req.body.timetable == undefined) {
        logging.error(NAMESPACE, 'Route save DYNAMIC called with invalid request body');
        return res.status(400).json({
            message: 'Request with invalid body'
        });
    }

    const data: TableData | undefined = req.body.timetable;

    const success = await timetableService.saveTableData(data);

    if (success != undefined && data != undefined) {
        data.id = success;
        return res.status(200).json({
            message: 'Save Route success',
            dataSaved: data
        });
    } else {
        return res.status(500).json({
            message: 'Save failed',
            failData: data
        });
    }
};

const getTimetableData = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Timetable controller get table data route called.');
    // if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    //     logging.error(NAMESPACE, 'Route called without body');
    //     return res.status(400).json({
    //         message: 'Request without body'
    //     });
    if (req.params.id == null) {
        logging.error(NAMESPACE, 'Route called with invalid parameters');
        return res.status(400).json({
            message: 'Invalid request'
        });
    }

    const findId = req.params.id;

    let data: TableData | undefined = await timetableService.getTableDataByID(findId);

    if (data != undefined) {
        return res.status(200).json({
            message: 'Get Table Data success',
            result: data
        });
    } else {
        return res.status(500).json({
            message: 'Get Table Data failed'
        });
    }
};

export default { getTimetableData, saveTimetableDataDynamic, saveTimetableDataStatic };
