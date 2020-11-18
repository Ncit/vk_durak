// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'action_app.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializer<ActionApp> _$actionAppSerializer = new _$ActionAppSerializer();

class _$ActionAppSerializer implements StructuredSerializer<ActionApp> {
  @override
  final Iterable<Type> types = const [ActionApp, _$ActionApp];
  @override
  final String wireName = 'ActionApp';

  @override
  Iterable<Object> serialize(Serializers serializers, ActionApp object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object>[
      'app_id',
      serializers.serialize(object.appId, specifiedType: const FullType(int)),
    ];
    if (object.appContext != null) {
      result
        ..add('app_context')
        ..add(serializers.serialize(object.appContext,
            specifiedType: const FullType(String)));
    }
    return result;
  }

  @override
  ActionApp deserialize(Serializers serializers, Iterable<Object> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new ActionAppBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'app_id':
          result.appId = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'app_context':
          result.appContext = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
      }
    }

    return result.build();
  }
}

class _$ActionApp extends ActionApp {
  @override
  final int appId;
  @override
  final String appContext;

  factory _$ActionApp([void Function(ActionAppBuilder) updates]) =>
      (new ActionAppBuilder()..update(updates)).build();

  _$ActionApp._({this.appId, this.appContext}) : super._() {
    if (appId == null) {
      throw new BuiltValueNullFieldError('ActionApp', 'appId');
    }
  }

  @override
  ActionApp rebuild(void Function(ActionAppBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  ActionAppBuilder toBuilder() => new ActionAppBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is ActionApp &&
        appId == other.appId &&
        appContext == other.appContext;
  }

  @override
  int get hashCode {
    return $jf($jc($jc(0, appId.hashCode), appContext.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('ActionApp')
          ..add('appId', appId)
          ..add('appContext', appContext))
        .toString();
  }
}

class ActionAppBuilder implements Builder<ActionApp, ActionAppBuilder> {
  _$ActionApp _$v;

  int _appId;
  int get appId => _$this._appId;
  set appId(int appId) => _$this._appId = appId;

  String _appContext;
  String get appContext => _$this._appContext;
  set appContext(String appContext) => _$this._appContext = appContext;

  ActionAppBuilder();

  ActionAppBuilder get _$this {
    if (_$v != null) {
      _appId = _$v.appId;
      _appContext = _$v.appContext;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(ActionApp other) {
    if (other == null) {
      throw new ArgumentError.notNull('other');
    }
    _$v = other as _$ActionApp;
  }

  @override
  void update(void Function(ActionAppBuilder) updates) {
    if (updates != null) updates(this);
  }

  @override
  _$ActionApp build() {
    final _$result =
        _$v ?? new _$ActionApp._(appId: appId, appContext: appContext);
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
