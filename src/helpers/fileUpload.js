
export const fileUpload = async ( file ) => {
    if( !file ) throw new Error('No tenemos ningun archivo a subir');

    const cloudUrl = import.meta.env.VITE_cloudUrl;
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {

        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });

        if( !resp.ok ) throw new Error('No se pudo subir imagen');

        const cloudResp = await resp.json();
        return cloudResp.secure_url;
        
    } catch (err) {
        console.error( err );
        throw new Error( err.message )
    }
}