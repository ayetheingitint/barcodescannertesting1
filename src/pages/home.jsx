import React from 'react';
import {
    f7,
    Page,
    Navbar,
    Button,
} from 'framework7-react';

const HomePage = () => {
    const navigateToBarCode = () => {
        f7.views.main.router.navigate('/barcode-reader/');
    };

    return (
        <Page>
            <Navbar title="Barcode Scanner Test" />
            <div className="centered-container">
                <Button fill onClick={navigateToBarCode} className="my-custom-button">
                    Read Barcode
                </Button>
            </div>


        </Page>
    );
};
export default HomePage;