var gulp = require('gulp');
var named = require('vinyl-named');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var uglify = require('gulp-uglify');

var OUTPUT_DIR = 'js/';

gulp.task('default', ['build-react-dev']);
//gulp.task('build', ['build-react-dev', 'build-deps-prod']);

gulp.task('build-react-dev', function() {
	return gulp.src('react-components/index.jsx')
		.pipe(webpackStream({
			output: {
				filename: 'bundle.js',
				publicPath: 'http://localhost:8090/js',
				libraryTarget: 'this'
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
		    },			plugins: [
				new webpack.DefinePlugin({
					'process.env.NODE_ENV': '"development"'
				}),
				new webpack.optimize.OccurenceOrderPlugin(),
				new webpack.optimize.DedupePlugin()
			]
		}))
		.pipe(gulp.dest(OUTPUT_DIR));
});

//gulp.task('build-deps-prod', function () {
//	return gulp.src(['Resources/react.js', 'Resources/babel.js'])
//		.pipe(named())
//		.pipe(webpackStream({
//			module: {
//				loaders: [
//					{
//						exclude: /node_modules/,
//						test: /\.js$/,
//						loader: 'babel',
//						query: {
//							presets: ['es2015', 'stage-0']
//						}
//					},
//				]
//			},
//			output: {
//				filename: '[name].generated.min.js',
//				libraryTarget: 'this'
//			},
//			plugins: [
//				new webpack.DefinePlugin({
//					'process.env.NODE_ENV': '"production"'
//				}),
//				new webpack.optimize.OccurenceOrderPlugin(),
//				new webpack.optimize.DedupePlugin()
//			]
//		}))
//		.pipe(uglify())
//		.pipe(gulp.dest(OUTPUT_DIR));
//});
