import { screen} from "@testing-library/react";

import {renderWithQueryClient} from "../../test-utils";
import {Treatments} from "../Treatments";

test('render response from query', async () => {
    renderWithQueryClient(<Treatments />);

    //получим каждый title treatments из mock data

    const treatmentTitles = await screen.findAllByRole('heading', {
        name: /massage|facial|scrub/i,
    });
    //пробежим по все файлам и сравнит name с тегами h, должно
    // быть 3 заголовка с name
    expect(treatmentTitles).toHaveLength(3);
})