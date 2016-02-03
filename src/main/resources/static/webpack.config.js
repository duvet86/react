module.exports = {
    entry: './react/index.jsx',
    output: {
    	path: 'js/',
        filename: 'bundle.js',
        //publicPath: 'http://localhost:3000/js'
    },
    debug: true,
    module: {
        loaders: [
            {
                //tell webpack to use jsx-loader for all *.jsx files
            	test: /\.jsx?$/,
            	exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                	plugins: ['transform-runtime'],
                    presets: ['es2015', 'stage-0', 'react'],
                }
            }
        ]
    },
    externals: {
        //don't bundle the 'react' npm package with our bundle.js
        //but get it from a global 'React' variable
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}