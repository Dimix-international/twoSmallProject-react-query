import { rest } from 'msw';

import {
    mockAppointments,
    mockStaff,
    mockTreatments,
    mockUserAppointments,
} from './mockData';

export const handlers = [
    rest.get('http://localhost:5000/treatments', (req, res, ctx) => {
        return res(ctx.json(mockTreatments));
    }),
    rest.get('http://localhost:5000/staff', (req, res, ctx) => {
        return res(ctx.json(mockStaff));
    }),
    rest.get(
        'http://localhost:5000/appointments/:year/:month',
        (req, res, ctx) => {
            return res(ctx.json(mockAppointments));
        },
    ),
    rest.get('http://localhost:5000/user/:id/appointments', (req, res, ctx) => {
        return res(ctx.json({ appointments: mockUserAppointments }));
    }),
    rest.patch('http://localhost:5000/appointment/:id', (req, res, ctx) => {
        return res(ctx.status(200));
    }),
];